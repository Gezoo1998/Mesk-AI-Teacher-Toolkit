import os
import re

tools_dir = r"e:\personal\Mesk AI Teacher Toolkit - Copy\src\app\tools"

# Robust regex to find any import of ToolForm
toolform_import_regex = re.compile(r'import\s+{\s*ToolForm\s*}\s+from\s+[\'"]@/components/ToolForm[\'"];?')

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == "page.tsx":
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if ToolHeader is used but not imported
            if '<ToolHeader' in content and 'import { ToolHeader }' not in content:
                print(f"Fixing imports in {path}")
                
                # Check if we can find ToolForm import to insert next to it
                match = toolform_import_regex.search(content)
                if match:
                    toolform_line = match.group(0)
                    new_imports = 'import { ToolHeader } from "@/components/ToolHeader";\n' + toolform_line
                    content = content.replace(toolform_line, new_imports)
                else:
                    # Fallback: add to the top after 'use client'
                    if "'use client'" in content or '"use client"' in content:
                        content = content.replace("'use client';", "'use client';\n\nimport { ToolHeader } from '@/components/ToolHeader';")
                        content = content.replace('"use client";', '"use client";\n\nimport { ToolHeader } from "@/components/ToolHeader";')
                    else:
                        content = 'import { ToolHeader } from "@/components/ToolHeader";\n' + content
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
