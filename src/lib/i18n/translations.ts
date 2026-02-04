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
            planningIdeas: 'Planning & Ideas',
            planningDesc: 'Structure your lessons and generate fresh ideas.',
            focusEngagement: 'Focus & Engagement',
            engagementDesc: 'Grab attention and keep students active.',
            contentCreation: 'Content Creation',
            contentDesc: 'Create materials and resources for your classes.',
            assessmentFeedback: 'Assessment & Feedback',
            assessmentDesc: 'Evaluate learning and provide feedback.',
            assessmentSubDesc: 'Rubrics, quizzes, and safety checks.',
        },
        tools: {
            'lesson-ideas': {
                title: 'Lesson ideas',
                description: 'Generate different ways to teach the same lesson with teacher and student actions.'
            },
            'lesson-planner': {
                title: 'Lesson planner',
                description: 'Objectives, warm-up, explanation, activities, assessment, and homework in one structure.',
                lessonTitleLabel: 'Lesson Title',
                subjectLabel: 'Subject',
                gradeLabel: 'Grade Level',
                durationLabel: 'Lesson Duration',
                standardLabel: 'Curriculum Standard (optional)'
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
            },
            'historical-perspective': {
                title: 'Historical Perspective Simulator',
                description: 'Create immersive historical learning experiences by generating diary entries and viewpoints from multiple figures involved in key events.'
            },
            'arabic-literature': {
                title: 'Arabic Literature Analyzer',
                description: 'Summarize and analyze Arabic literary texts with themes and questions.'
            },
            'math-proof-assistant': {
                title: 'Advanced Math Proof Assistant',
                description: 'Guide through step-by-step mathematical proofs and derivations.'
            },
            'peer-review': {
                title: 'Peer Review Framework Creator',
                description: 'Generate structured peer review checklists and feedback templates.'
            },
            'multimedia-generator': {
                title: 'Multimedia Content Generator',
                description: 'Create presentation slide structures, visual hooks, and image prompts for your lessons.',
                contentTypeLabel: 'What do you want to create?',
                visualStyleLabel: 'Visual Style',
                presentationSlides: 'Presentation Slides',
                imagePrompts: 'Educational Image Prompts',
                videoScript: 'Short Educational Video Script',
                styleModern: 'Modern & Clean',
                styleEngaging: 'Colorful & Engaging',
                styleProfessional: 'Formal & Professional',
            }
        },
        common: {
            schoolName: 'Mesk Language School',
            openTool: 'Open Tool',
            generatedResult: 'Generated Result',
            copyText: 'Copy Text',
            copied: 'Copied!',
            readyToUse: 'Ready to use',
            somethingWentWrong: 'Something went wrong. Please try again.',
            logoAlt: 'Mesk School Logo',
            generatedBy: 'Generated by Mesk AI Toolkit',
            generatedTitle: 'Resource Content',
            generateContent: 'Generate Content',
            generatingMagic: 'Generating Magic...',
            searchingCurriculum: '🔍 Searching Egyptian curriculum for lesson objectives...',
            searchGoogle: '🔍 Searching Google for "{{topic}}" in Egyptian curriculum...',
            searchBilingual: '🌐 Comparing Arabic and English sources...',
            searchFound: '✅ Found relevant objectives on MoETE portal...',
            searchExtracting: '✨ Extracting and aligning curriculum standards...',
            refine: 'Refine',
            refineSimplify: 'Simplify',
            refineAddDetails: 'Add Details',
            refineShorten: 'Shorten',
            refineAddActivities: 'Add Activities',
            pdf: 'PDF',
            docx: 'DOCX',
            select: 'Select...',
            loading: 'Loading settings...',
            topicLabel: 'Topic',
            subjectLabel: 'Subject',
            gradeLabel: 'Grade Level',
            lessonTitleLabel: 'Lesson Title',
            durationLabel: 'Lesson Duration',
            arabicTextLabel: 'Arabic Text',
            analysisTypeLabel: 'Analysis Type',
            textLabel: 'Text',
            gameStyleLabel: 'Preferred Game Style',
            historicalEventLabel: 'Historical Event',
            perspectivesLabel: 'Number of Perspectives',
            classSizeLabel: 'Class Size',
            timeAvailableLabel: 'Time Available',
            activityGoalLabel: 'Activity Goal',
            experimentLabel: 'Experiment Details',
            targetLanguageLabel: 'Target Language',
            scenarioLabel: 'Scenario',
            proficiencyLabel: 'Proficiency Level',
            grammarRuleLabel: 'Grammar Rule',
            storyThemeLabel: 'Story Theme',
            mathConceptLabel: 'Math Concept',
            proofTypeLabel: 'Proof Type',
            interestsLabel: 'Student Interests (Optional)',
            projectTopicLabel: 'Project Topic',
            frameworkTypeLabel: 'Framework Type',
            readingTextLabel: 'Text to Level',
            misconceptionTopicLabel: 'Science Topic',
            assignmentDescLabel: 'Assignment Description',
            gradingCriteriaLabel: 'Grading Criteria',
            assignmentTypeLabel: 'Assignment Type',
            rewriteLabel: 'Text to Rewrite',
            targetGradeLabel: 'Target Grade Level',
            assignmentTitleLabel: 'Assignment Title',
            summaryStyleLabel: 'Summary Style',
            wordsListLabel: 'Word List',
            summarizeLabel: 'Text to Summarize',
            vocabListLabel: 'Vocabulary List',
            topicPlaceholder: 'e.g. Ancient Egypt, Photosynthesis...',
            experimentPlaceholder: 'e.g. Elephant Toothpaste, Mixing Acid & Base...',
            scenarioPlaceholder: 'e.g. Ordering coffee, Asking for directions...',
            grammarPointPlaceholder: 'e.g. Past Tense, Future Perfect...',
            storyThemePlaceholder: 'e.g. A mystery at a hotel, A space adventure...',
            historicalEventPlaceholder: 'e.g. The French Revolution, Solar Eclipse...',
            standardPlaceholder: 'e.g. Science G4 Unit 1, Math Prep 1...',
            interestsPlaceholder: 'e.g. Football, Video Games, Space...',
            proofPlaceholder: 'e.g. Pythagorean Theorem, Quadratic Formula...',
            summarizePlaceholder: 'Paste the educational text here...',
            rubricPlaceholder: 'Describe what students need to do...',
        },
        tags: {
            ideas: '3–5 ideas',
            lessonPlanning: 'Lesson Planning',
            fulllesson: 'Full lesson',
            curriculumIntegration: 'Curriculum Integration',
            partoutput: '3-part output',
            readingComprehension: 'Reading Comprehension',
            storybased: 'Story-based',
            wordbanks: 'Word banks',
            practice: 'Practice',
            assessment: 'Assessment',
            mCQs: 'MCQs',
            answerKeys: 'Answer Keys',
            engagement: 'Engagement',
            criticalThinking: 'Critical Thinking',
            speaking: 'Speaking',
            grammar: 'Grammar',
            differentiation: 'Differentiation',
            planning: 'Planning',
            community: 'Community',
            science: 'Science',
            safety: 'Safety',
            gamification: 'Gamification',
            literacy: 'Literacy',
            multipleviewpoints: 'Multiple viewpoints',
            historyEducation: 'History Education',
            arabictexts: 'Arabic texts',
            stepbystep: 'Step-by-step',
            collaboration: 'Collaboration',
        },
        chat: {
            title: 'AI Chat Assistant',
            subtitle: 'Brainstorm and plan with AI',
            placeholder: 'Ask me anything about your lessons...',
            send: 'Send',
            welcome: 'Hello! How can I help you with your teaching today?',
            clear: 'Clear Chat',
            thinking: 'Thinking...',
        },
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
            langMode: 'Ar-Eg + En',
            quickTip: 'نصيحة سريعة',
            quickTipContent: 'اختر أداة، وأدخل موضوعك، واترك الذكاء الاصطناعي يقوم بالعمل الشاق. يمكنك تعديل كل شيء لاحقاً.',
            toggleEn: 'English',
            toggleAr: 'Arabic',
        },
        dashboard: {
            readyToTeach: 'جاهز للتدريس',
            heroTitle: 'جاهز لصنع السحر؟ ✨',
            heroDesc: 'مساعدك الشخصي في التدريس هنا. اختر أداة، أخبرني بما تحتاجه، وسأقوم بالباقي.',
            step1: 'اختر أداتك',
            step1Desc: 'اختر من مخططي الدروس، أو حقائق ممتعة، أو مولدات الأنشطة.',
            step2: 'خصصها',
            step2Desc: 'حدد المرحلة، والمادة، والموضوع للحصول على النتيجة المثالية.',
            step3: 'درّس',
            step3Desc: 'انسخ النتيجة واستخدمها مباشرة في فصلك.',
            planningIdeas: 'التخطيط والأفكار',
            planningDesc: 'خطط لدروسك وولد أفكاراً جديدة.',
            focusEngagement: 'التركيز والتفاعل',
            engagementDesc: 'اجذب الانتباه وحافظ على نشاط الطلاب.',
            contentCreation: 'إنشاء المحتوى',
            contentDesc: 'أنشئ مواد ومصادر لفصولك.',
            assessmentFeedback: 'التقييم والملاحظات',
            assessmentDesc: 'قيم التعلم وقدم ملاحظاتك.',
            assessmentSubDesc: 'نماذج التقييم، الاختبارات، وفحوصات السلامة.',
        },
        tools: {
            'lesson-ideas': {
                title: 'أفكار للدروس',
                description: 'توليد طرق مختلفة لتدريس نفس الدرس مع إجراءات المعلم والطالب.'
            },
            'lesson-planner': {
                title: 'مخطط الدروس',
                description: 'الأهداف، الإحماء، الشرح، الأنشطة، التقييم، والواجب المنزلي في هيكل واحد.',
                lessonTitleLabel: 'عنوان الدرس',
                subjectLabel: 'المادة',
                gradeLabel: 'المرحلة الدراسية',
                durationLabel: 'مدة الدرس',
                standardLabel: 'المعيار المنهجي (اختياري)'
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
                title: 'مخطط التعلم القائم على المشاريع (PBL)',
                description: 'خطط وحدات تعليمية كاملة تعتمد على المشاريع مع مراحل زمنية وأسئلة توجيهية.'
            },
            'icebreakers': {
                title: 'أنشطة كسر الجمود',
                description: 'أنشطة ممتعة وبسيطة لبناء روح المجتمع وتهيئة الفصل للتعلم.'
            },
            'debate-spark': {
                title: 'محفز المناظرات الصفية',
                description: 'توليد مواضيع مثيرة للجدل ومناسبة للفصل لتعزيز مهارات التفكير النقدي والمناظرة البناءة.'
            },
            'lab-safety': {
                title: 'إرشادات السلامة في المعمل',
                description: 'تحديد المخاطر والاحتياطات السلامة اللازمة لأي تجربة علمية.'
            },
            'gamify-lesson': {
                title: 'تعلب (Gamify) هذا الدرس',
                description: 'حول أي محتوى دراسي إلى هيكل لعبة تعليمية جذابة وتنافسية.'
            },
            'vocab-story': {
                title: 'صانع قصص المفردات',
                description: 'دمج قائمة من المفردات الجديدة في قصة إبداعية ومتماسكة لسهولة الحفظ.'
            },
            'historical-perspective': {
                title: 'محاكي المنظور التاريخي',
                description: 'إنشاء تجارب تعلم تاريخية غامرة من خلال مذكرات ووجهات نظر الشخصيات المختلفة في الأحداث.'
            },
            'arabic-literature': {
                title: 'محلل الأدب العربي',
                description: 'تلخيص وتحليل النصوص الأدبية العربية مع استخراج السمات والأسئلة.'
            },
            'math-proof-assistant': {
                title: 'مساعد براهين الرياضيات',
                description: 'دليل خطوة بخطوة لشرح البراهين والاستنتاجات الرياضية المتقدمة.'
            },
            'peer-review': {
                title: 'منظم التقييم بين الأقران',
                description: 'إنشاء قوائم مراجعة وقوالب ملاحظات مهيكلة لتقييم الطلاب لبعضهم البعض.'
            },
            'multimedia-generator': {
                title: 'مولد الوسائط المتعددة',
                description: 'أنشئ هياكل العروض التقديمية، الجوانب البصرية، ومقترحات الصور لدروسك.',
                contentTypeLabel: 'ماذا تريد أن تنشئ؟',
                visualStyleLabel: 'النمط البصري',
                presentationSlides: 'شرائح عرض تقديمي',
                imagePrompts: 'مقترحات صور تعليمية',
                videoScript: 'سيناريو فيديو تعليمي قصير',
                styleModern: 'حديث ونظيف',
                styleEngaging: 'ملون وتفاعلي',
                styleProfessional: 'رسمي واحترافي',
            }
        },
        common: {
            schoolName: 'مدارس مسك للغات',
            openTool: 'افتح الأداة',
            generatedResult: 'النتيجة المولدة',
            copyText: 'نسخ النص',
            copied: 'تم النسخ!',
            readyToUse: 'جاهز للاستخدام',
            somethingWentWrong: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
            logoAlt: 'شعار مدرسة مسك',
            generatedBy: 'تم إنشاؤه بواسطة مساعد مسك',
            generatedTitle: 'الدرس المولد',
            generateContent: 'إنشاء المحتوى',
            generatingMagic: 'جاري إنشاء السحر...',
            searchingCurriculum: '🔍 جاري البحث في المنهج المصري عن أهداف الدرس...',
            searchGoogle: '🔍 جاري البحث في جوجل عن "{{topic}}" في المنهج المصري...',
            searchBilingual: '🌐 جاري مقارنة المصادر العربية والإنجليزية...',
            searchFound: '✅ تم العثور على أهداف مناسبة في بوابة الوزارة...',
            searchExtracting: '✨ جاري استخراج وتنسيق معايير المنهج...',
            refine: 'تحسين',
            refineSimplify: 'تبسيط',
            refineAddDetails: 'إضافة تفاصيل',
            refineShorten: 'اختصار',
            refineAddActivities: 'إضافة أنشطة',
            pdf: 'PDF',
            docx: 'DOCX',
            select: 'اختر...',
            loading: 'جاري تحميل الإعدادات...',
            topicLabel: 'الموضوع',
            subjectLabel: 'المادة',
            gradeLabel: 'المرحلة الدراسية',
            lessonTitleLabel: 'عنوان الدرس',
            durationLabel: 'مدة الدرس',
            arabicTextLabel: 'النص العربي',
            analysisTypeLabel: 'نوع التحليل',
            textLabel: 'النص',
            gameStyleLabel: 'أسلوب اللعبة المفضل',
            historicalEventLabel: 'الحدث التاريخي',
            perspectivesLabel: 'عدد وجهات النظر',
            classSizeLabel: 'حجم الفصل',
            timeAvailableLabel: 'الوقت المتاح',
            activityGoalLabel: 'هدف النشاط',
            experimentLabel: 'تفاصيل التجربة',
            targetLanguageLabel: 'اللغة المستهدفة',
            scenarioLabel: 'السيناريو',
            proficiencyLabel: 'مستوى الاتقان',
            grammarRuleLabel: 'قاعدة نحوية',
            storyThemeLabel: 'سمة القصة',
            mathConceptLabel: 'مفهوم رياضي',
            proofTypeLabel: 'نوع البرهان',
            interestsLabel: 'اهتمامات الطلاب (اختياري)',
            projectTopicLabel: 'موضوع المشروع',
            frameworkTypeLabel: 'نوع الإطار',
            readingTextLabel: 'النص المراد تقييمه',
            misconceptionTopicLabel: 'موضوع العلوم',
            assignmentDescLabel: 'وصف المهمة',
            gradingCriteriaLabel: 'معايير التقييم',
            assignmentTypeLabel: 'نوع المهمة',
            rewriteLabel: 'النص المراد إعادة صياغته',
            targetGradeLabel: 'المرحلة الدراسية المستهدفة',
            assignmentTitleLabel: 'عنوان المهمة',
            summaryStyleLabel: 'أسلوب التلخيص',
            wordsListLabel: 'قائمة الكلمات',
            summarizeLabel: 'النص المراد تلخيصه',
            vocabListLabel: 'قائمة المفردات',
            topicPlaceholder: 'مثال: مصر القديمة، البناء الضوئي...',
            experimentPlaceholder: 'مثال: تجربة معجون أسنان الفيل، خلط الأحماض...',
            scenarioPlaceholder: 'مثال: طلب القهوة، السؤال عن الاتجاهات...',
            grammarPointPlaceholder: 'مثال: الماضي البسيط، المستقبل التام...',
            storyThemePlaceholder: 'مثال: لغز في فندق، مغامرة في الفضاء...',
            historicalEventPlaceholder: 'مثال: الثورة الفرنسية، كسوف الشمس...',
            standardPlaceholder: 'مثال: علوم رابع ابتدائي، رياضيات أولى إعدادي...',
            interestsPlaceholder: 'مثال: كرة القدم، ألعاب الفيديو، الفضاء...',
            proofPlaceholder: 'مثال: نظرية فيثاغورس، الصيغة التربيعية...',
            summarizePlaceholder: 'الصق النص التعليمي هنا...',
            rubricPlaceholder: 'صف ما يجب على الطلاب فعله...',
        },
        tags: {
            ideas: '3-5 أفكار',
            lessonPlanning: 'تخطيط الدروس',
            fulllesson: 'درس كامل',
            curriculumIntegration: 'تكامل المنهج',
            partoutput: 'مخرج من 3 أجزاء',
            readingComprehension: 'فهم المقروء',
            storybased: 'قائم على القصة',
            wordbanks: 'بنوك الكلمات',
            practice: 'ممارسة',
            assessment: 'تقييم',
            mCQs: 'أسئلة الاختيار من متعدد',
            answerKeys: 'مفاتيح الإجابة',
            engagement: 'تفاعل',
            criticalThinking: 'تفكير نقدي',
            speaking: 'تحدث',
            grammar: 'قواعد',
            differentiation: 'تمايز',
            planning: 'تخطيط',
            community: 'مجتمع',
            science: 'علوم',
            safety: 'سلامة',
            gamification: 'تعلب',
            literacy: 'محو الأمية',
            multipleviewpoints: 'وجهات نظر متعددة',
            historyEducation: 'تعليم التاريخ',
            arabictexts: 'نصوص عربية',
            stepbystep: 'خطوة بخطوة',
            collaboration: 'تعاون',
        },
    }
};
