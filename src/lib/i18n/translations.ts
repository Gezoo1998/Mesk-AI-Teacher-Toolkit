export type Language = 'en' | 'ar';

export const translations = {
    en: {
        sidebar: {
            schoolName: 'Mesk Language School',
            appName: 'Mesk AI Teacher Toolkit',
            desc: 'Your intelligent teaching companion. Turn ideas into classroom-ready resources in seconds.',
            currentMode: 'Current Mode',
            gradeLevel: 'Grade Level',
            allGrades: 'All Grades',
            language: 'Language',
            langMode: 'Ar-Eg + En',
            quickTip: 'Quick Tip',
            quickTipContent: 'Select a tool, enter your topic, and let AI do the heavy lifting. You can edit everything later.',
            toggleEn: 'English',
            toggleAr: 'Arabic',
        },
        dashboard: {
            readyToTeach: 'Ready to teach',
            heroTitle: 'Ready to Create Magic? ✨',
            heroDesc: 'Your personal teaching assistant is here. Pick a tool, tell me what you need, and I\'ll handle the rest.',
            step1: 'Choose your tool',
            step1Desc: 'Pick from lesson planners, fun facts, or activity generators.',
            step2: 'Customise It',
            step2Desc: 'Set the grade, subject, and topic to get the perfect fit.',
            step3: 'Teach',
            step3Desc: 'Copy the result and use it directly in your classroom.',
        },
        tools: {
            'lesson-ideas': {
                title: 'Lesson ideas',
                description: 'Generate different ways to teach the same lesson with teacher and student actions.'
            },
            'lesson-planner': {
                title: 'Lesson planner',
                description: 'Objectives, warm-up, explanation, activities, assessment, and homework in one structure.'
            },
            'text-summarizer': {
                title: 'Text summarizer',
                description: 'Turn long texts into short summary, bullet points, and teacher-friendly explanation.'
            },
            'math-problems': {
                title: 'Math & Science Problems',
                description: 'Real-life stories for Math or Science with given, required, solution steps, final answer, and teaching hint.'
            },
            'vocab-list': {
                title: 'Vocabulary lists',
                description: 'Age-appropriate word lists with definitions, examples, and teacher usage tips.'
            },
            'activities': {
                title: 'Activities & questions',
                description: 'Classroom activities, games, and assessment questions matching topic and difficulty.'
            },
            'question-generator': {
                title: 'Question Generator',
                description: 'Generate MCQs, short answer, and thinking questions with answer keys.'
            },
            'math-real-world': {
                title: 'Real-World Math Connector',
                description: 'Connect abstract math concepts to engaging real-life scenarios like sports, architecture, or gaming.'
            },
            'science-misconception': {
                title: 'Misconception Buster',
                description: 'Address common scientific myths with clear facts, true/false tables, and simple experiments.'
            },
            'language-dialogue': {
                title: 'Dialogue Crafter',
                description: 'Generate natural, situational dialogues for foreign language practice with cultural notes.'
            },
            'language-grammar': {
                title: 'Grammar in Context',
                description: 'Create short stories that naturally weave in specific grammar rules for contextual learning.'
            },
            'smart-rubric': {
                title: 'Smart Rubric Generator',
                description: 'Create detailed grading criteria with scoring levels for any assignment.'
            },
            'reading-leveler': {
                title: 'Reading Level Adjuster',
                description: 'Rewrite text to suit different reading abilities (Easy, Medium, Hard).'
            },
            'hook-generator': {
                title: 'Hook Generator',
                description: 'Exciting ways to start your lesson and grab student attention immediately.'
            },
            'pbl-planner': {
                title: 'PBL Planner',
                description: 'Plan comprehensive Project-Based Learning units with milestones and driving questions.'
            },
            'icebreakers': {
                title: 'Classroom Icebreakers',
                description: 'Fun, low-stakes activities to build community and warm up the class.'
            },
            'debate-spark': {
                title: 'Debate Topic Spark',
                description: 'Generate controversial but appropriate topics to fuel constructive class debates.'
            },
            'lab-safety': {
                title: 'Lab Safety Checker',
                description: 'Identify hazards and safety precautions for any science experiment.'
            },
            'gamify-lesson': {
                title: 'Gamify This Lesson',
                description: 'Turn any lesson content into an engaging classroom game structure.'
            },
            'vocab-story': {
                title: 'Vocabulary Story Weaver',
                description: 'Weave a list of vocabulary words into a coherent, creative story.'
            }
        },
        common: {
            openTool: 'Open Tool',
            generatedResult: 'Generated Result',
            copyText: 'Copy Text',
            copied: 'Copied!',
            readyToUse: 'Ready to use',
            generatedBy: 'Generated by Mesk AI Toolkit',
        }
    },
    ar: {
        sidebar: {
            schoolName: 'مدرسة مسك للغات',
            appName: 'مساعد المعلم الذكي',
            desc: 'رفيقك الذكي في التدريس. حول الأفكار إلى مصادر جاهزة للفصل في ثوانٍ.',
            currentMode: 'الوضع الحالي',
            gradeLevel: 'المراحل الدراسية',
            allGrades: 'كل المراحل',
            language: 'اللغة',
            langMode: 'عربي + إنجليزي',
            quickTip: 'نصيحة سريعة',
            quickTipContent: 'اختر أداة، اكتب الموضوع، واترك الذكاء الاصطناعي يقوم بالباقي. يمكنك تعديل كل شيء لاحقاً.',
            toggleEn: 'English',
            toggleAr: 'عربي',
        },
        dashboard: {
            readyToTeach: 'جاهز للتدريس',
            heroTitle: 'جاهز للإبداع اليوم؟ ✨',
            heroDesc: 'مساعدك الشخصي وصل! اختر الأداة اللي محتاجها، وسيب الباقي عليا.',
            step1: 'اختر أداتك',
            step1Desc: 'اختر من بين مخططي الدروس، الحقائق الممتعة، أو مولدات الأنشطة.',
            step2: 'خصص المحتوى',
            step2Desc: 'حدد الصف والمادة والموضوع للحصول على النتيجة المثالية.',
            step3: 'ابدأ الدرس',
            step3Desc: 'انسخ النتيجة واستخدمها مباشرة في فصلك الدراسي.',
        },
        tools: {
            'lesson-ideas': {
                title: 'أفكار للدروس',
                description: 'توليد طرق مختلفة لتدريس نفس الدرس مع إجراءات المعلم والطالب.'
            },
            'lesson-planner': {
                title: 'مخطط الدروس',
                description: 'الأهداف، الإحماء، الشرح، الأنشطة، التقييم، والواجب المنزلي في هيكل واحد.'
            },
            'text-summarizer': {
                title: 'ملخص النصوص',
                description: 'تحويل النصوص الطويلة إلى ملخص قصير، نقاط رئيسية، وشرح مبسط للمعلم.'
            },
            'math-problems': {
                title: 'مسائل رياضيات وعلوم',
                description: 'قصص من الحياة الواقعية للرياضيات أو العلوم مع المعطيات، المطلوب، خطوات الحل، والناتج النهائي.'
            },
            'vocab-list': {
                title: 'قوائم المفردات',
                description: 'قوائم كلمات مناسبة للعمر مع تعريفات، أمثلة، ونصائح استخدام للمعلم.'
            },
            'activities': {
                title: 'أنشطة وأسئلة',
                description: 'أنشطة صفية، ألعاب، وأسئلة تقييم تناسب الموضوع والمستوى.'
            },
            'question-generator': {
                title: 'مولد الأسئلة',
                description: 'توليد أسئلة اختيار من متعدد، إجابات قصيرة، وأسئلة تفكير مع نماذج الإجابة.'
            },
            'math-real-world': {
                title: 'رابط الرياضيات بالواقع',
                description: 'ربط مفاهيم الرياضيات المجردة بسيناريوهات واقعية ممتعة مثل الرياضة، الهندسة المعمارية، أو الألعاب.'
            },
            'science-misconception': {
                title: 'كاشف المفاهيم الخاطئة',
                description: 'تصحيح الخرافات العلمية الشائعة بحقائق واضحة، جداول صح/خطأ، وتجارب بسيطة.'
            },
            'language-dialogue': {
                title: 'صانع الحوارات',
                description: 'إنشاء حوارات طبيعية ومناسبة للموقف لممارسة اللغات الأجنبية مع ملاحظات ثقافية.'
            },
            'language-grammar': {
                title: 'النحو في سياق',
                description: 'إنشاء قصص قصيرة تدمج قواعد نحوية محددة بشكل طبيعي للتعلم من خلال السياق.'
            },
            'smart-rubric': {
                title: 'مولد معايير التقييم',
                description: 'إنشاء جداول تقييم مفصلة (Rubric) مع مستويات الدرجات لأي واجب مدرسي.'
            },
            'reading-leveler': {
                title: 'معدل مستويات القراءة',
                description: 'إعادة كتابة النصوص لتناسب مستويات القراءة المختلفة (سهل، متوسط، صعب) في وقت واحد.'
            },
            'hook-generator': {
                title: 'خاطف الانتباه (The Hook)',
                description: 'طرق مثيرة لبدء حصتك وجذب انتباه الطلاب فوراً (لغز، نكتة، عرض عملي).'
            },
            'pbl-planner': {
                title: 'مخطط التعلم القائم على المشاريع',
                description: 'تخطيط وحدات تعليمية كاملة قائمة على المشاريع مع المحطات والأسئلة المحركة.'
            },
            'icebreakers': {
                title: 'كسر الجمود',
                description: 'أنشطة ممتعة وسريعة لبناء مجتمع الفصل وتنشيط الطلاب.'
            },
            'debate-spark': {
                title: 'محفز المناظرات',
                description: 'توليد مواضيع جدلية مثيرة ولكن مناسبة لإشعال مناظرات بناءة في الفصل.'
            },
            'lab-safety': {
                title: 'فاحص أمان المعمل',
                description: 'تحديد المخاطر واحتياطات السلامة لأي تجربة علمية.'
            },
            'gamify-lesson': {
                title: 'لعبة الدرس',
                description: 'تحويل محتوى أي درس إلى هيكل لعبة ممتعة وتفاعلية.'
            },
            'vocab-story': {
                title: 'حكواتي المفردات',
                description: 'نسج قائمة من الكلمات الجديدة في قصة إبداعية متماسكة ومضحكة.'
            }
        },
        common: {
            openTool: 'افتح الأداة',
            generatedResult: 'النتيجة المولدة',
            copyText: 'نسخ النص',
            copied: 'تم النسخ!',
            readyToUse: 'جاهز للاستخدام',
            generatedBy: 'تم إنشاؤه بواسطة مساعد مسك',
        }
    }
};
