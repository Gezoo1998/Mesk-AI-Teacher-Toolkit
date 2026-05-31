import os
import re

tools_dir = r"e:\personal\Mesk AI Teacher Toolkit - Copy\src\app\tools"

header_regex = re.compile(r'<header className="border-b border-primary/10 pb-4">.*?</header>', re.DOTALL)
import_regex = re.compile(r'import { ToolForm } from "@/components/ToolForm";')

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == "page.tsx":
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract toolId
            tool_id_match = re.search(r'toolId\s*=\s*[\'"]([^\'"]+)[\'"]', content)
            tool_id_var_match = re.search(r'const toolId = [\'"]([^\'"]+)[\'"]', content)
            
            tool_id = None
            if tool_id_var_match:
                tool_id = tool_id_var_match.group(1)
            elif tool_id_match:
                tool_id = tool_id_match.group(1)
            
            if not tool_id:
                # Try to get it from folder name
                tool_id = os.path.basename(root)
            
            if tool_id:
                print(f"Updating {path} with toolId: {tool_id}")
                
                # Replace header
                new_header = f'<ToolHeader toolId="{tool_id}" />'
                if '{toolId}' in content or 'toolId={toolId}' in content:
                     new_header = f'<ToolHeader toolId={{toolId}} />'
                
                # If the page uses the 'const toolId' variable in the header text, we need to be careful
                # but ToolHeader handles itInternally.
                
                content = header_regex.sub(new_header, content)
                
                # Add import if not present
                if 'import { ToolHeader }' not in content:
                    content = import_regex.sub('import { ToolHeader } from "@/components/ToolHeader";\nimport { ToolForm } from "@/components/ToolForm";', content)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
