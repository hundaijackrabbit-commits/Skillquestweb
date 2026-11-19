import type { ChineseEdition } from './editorial-types';

// Substantive Chinese editorial adaptations of the existing Nov 2026 articles.
// Links retain source evidence; research statements are attributed carefully.
export const CHINESE_ARTICLE_EDITIONS: Readonly<Record<string, ChineseEdition>> = {
  "ai-skills-2024-guide": {
    "slug": "ai-skills-2024-guide",
    "title": "2026 年职场 AI 技能：从提示词到负责任的任务委派",
    "subtitle": "真正重要的不是写出精彩提示词，而是让 AI 在可验证的流程中发挥作用",
    "description": "中文解读 2026 年职场 AI 技能：五步工作流程、人工责任、核验、隐私保护，以及 30 分钟任务委派练习。",
    "introduction": [
      "AI 工具正在成为写作、研究、数据整理和工作协作的一部分。但把任务交给 AI，不代表人可以放弃对结果的判断与责任。高质量的使用方式需要先说清目标、资料范围和审核标准，再决定哪些步骤可以委派。",
      "本文依据 Modern Skill Lab 于 2026 年 11 月更新的英文专题整理。相关研究描述了 AI 的应用与风险，但“使用人数增加”并不能证明使用者已经具备核验输出或保护隐私的能力。"
    ],
    "sections": [
      {
        "heading": "研究更新：使用 AI 不等于真正掌握 AI",
        "paragraphs": [
          "原文引用 OECD 的 2026 年《数字经济与社会展望》：在报告所用的最近调查数据中，OECD 国家 16 至 74 岁成年人过去三个月使用生成式 AI 的比例约为 37%，工作用途约为 19%，私人用途约为 30%。这些是跨国调查的描述性统计，不是使用能力测验。",
          "OECD 另一份研究还强调，“岗位中存在 AI 可以辅助的任务”不等于“整个岗位必然被自动化替代”。职业中仍有大量涉及判断、关系、协调和责任的工作。"
        ]
      },
      {
        "heading": "第一步：定义可以检验的任务",
        "paragraphs": [
          "先确定输出要支持什么决定、谁会使用、哪些资料具有权威性、哪些限制不可突破，以及怎样判断结果是否合格。",
          "例如，把“分析客户反馈”改为“依据经过授权、已去标识化的反馈，识别本月最常见的三类问题，附原文依据，并明确不确定的部分”，就更容易检查。"
        ]
      },
      {
        "heading": "第二步：明确分工与责任",
        "paragraphs": [
          "AI 可以整理、改写或提出选项，但重要证据需要核实，关键判断和最终批准必须有明确的人负责。将生成、核验和决策混在一起，容易让一份看似完整的草稿获得不应有的权威性。"
        ],
        "points": [
          "AI 可做：起草、分类、生成备选方案。",
          "人必须做：确认事实、评估风险、批准重要行动。",
          "流程应留下可追踪的资料来源与审核记录。"
        ]
      },
      {
        "heading": "第三步：按后果设置审核强度",
        "paragraphs": [
          "内部创意脑暴与涉及招聘、财务、法律、健康或安全的结论，需要不同的核验深度。对于后果较大的内容，应检查原始来源、重算关键数字、识别缺失背景，并在必要时由具备专业资格的人复核。",
          "NIST 的生成式 AI 风险管理资料强调，风险管理贯穿系统使用过程，而不是发布前做一次拼写检查就够了。"
        ]
      },
      {
        "heading": "第四步：设置数据与信息边界",
        "paragraphs": [
          "在输入资料前，先查明组织是否允许使用该工具。私人、客户拥有、受监管或安全敏感的信息，可能需要经过授权的系统、去标识化处理，或者完全不同的工作流程。",
          "为了效率而违反保密或数据保护义务，并不是好的 AI 使用结果。"
        ]
      },
      {
        "heading": "第五步：评估整个工作流程",
        "paragraphs": [
          "比较使用 AI 前后的总工作时间、审核时间、错误数量，以及最终成果是否更容易执行。如果产生了更多检查和返工，表面上的速度提升可能没有实际价值。",
          "随着工具变化，可靠的职业技能是任务界定、证据核验、隐私判断和有责任的协作，而不是某个产品的操作技巧。"
        ]
      }
    ],
    "exercise": {
      "title": "30 分钟练习：制作 AI 任务委派卡",
      "steps": [
        "选择一项不涉及机密数据的日常工作。",
        "写下目标、允许使用的资料、必须保留的限制。",
        "划分 AI 可做、需要人工核验和必须人工批准的步骤。",
        "试运行一次，记录错误、审核成本和下一次的改进。"
      ],
      "success": "这张卡应能让他人清楚了解任务如何执行、结果怎样核实，以及最终由谁负责。"
    },
    "references": [
      {
        "title": "OECD｜《数字经济与社会展望 2026》",
        "url": "https://www.oecd.org/en/publications/oecd-digital-economy-and-society-outlook-2026_022ed474-en.html"
      },
      {
        "title": "OECD｜《人工智能时代的技能》",
        "url": "https://www.oecd.org/en/publications/skills-in-the-ai-age_972bd15e-en.html"
      },
      {
        "title": "NIST｜生成式人工智能风险管理概况",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
      },
      {
        "title": "世界经济论坛｜《未来就业报告 2025》",
        "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/"
      }
    ],
    "related": [
      {
        "title": "AI 素养技能指南",
        "href": "/zh-CN/skills/ai-literacy"
      },
      {
        "title": "批判性思维技能指南",
        "href": "/zh-CN/skills/critical-thinking"
      }
    ],
    "sourceReviewedAt": "2026-11-10",
    "kind": "article"
  },
  "data-skills-career-growth": {
    "slug": "data-skills-career-growth",
    "title": "2026 年数据技能：从数据证据走向可靠决策",
    "subtitle": "五步分析流程：问题、指标、数据质量、解释和行动",
    "description": "中文数据技能专题：如何定义指标、避免因果误判、合理使用 AI，以及制作能够支持业务决策的数据作品集。",
    "introduction": [
      "现代工具可以快速生成 SQL、图表、摘要甚至预测，真正稀缺的能力因此转向了另一个环节：决定什么值得衡量、证据是否可靠，以及一个行动建议究竟有多大把握。",
      "本文根据站内 2026 年 11 月更新的英文专题整理，强调描述性统计、因果推断和决策建议之间的区别。"
    ],
    "sections": [
      {
        "heading": "研究提醒：有联系，不代表有因果",
        "paragraphs": [
          "原文介绍了 OECD《就业展望 2026》对成人技能、培训与工资的研究。报告发现非正规培训与工资之间存在正向关联，同时指出高薪职业往往也更容易提供培训，因此不能由此直接推断培训一定导致工资上涨。",
          "分析师必须记录数据时期、样本、比较对象、控制因素和不确定性。即使一张图由 AI 自动生成，这些问题也不能省略。"
        ]
      },
      {
        "heading": "第一步：先问“我们要决定什么”",
        "paragraphs": [
          "“分析留存率”过于笼统。更好的问题会明确目标用户、行为、时间和预期行动，例如：“哪些新用户首周行为与 90 天后仍在使用产品有关？应该测试哪一种引导方式？”"
        ]
      },
      {
        "heading": "第二步：在计算前定义指标",
        "paragraphs": [
          "“活跃”“转化”“质量”和“流失”都可能有多种含义。先写下统计单位、纳入范围、排除条件、时间窗口、来源系统及缺失记录。",
          "统一的指标定义可以避免两个人用不同口径计算同一个看似相同的数字。"
        ],
        "points": [
          "明确分子与分母。",
          "记录来源和更新频率。",
          "检查缺失、重复与延迟的数据。",
          "说明基准组与比较区间。"
        ]
      },
      {
        "heading": "第三步：追踪数据产生的过程",
        "paragraphs": [
          "客服工单只能记录被报告的问题，无法直接告诉你有多少遇到问题却没有联系支持团队的人。数据的收集机制本身可能带来偏差。",
          "问清是谁提交记录、哪些人没有被记录、采集方式是否中途变化，以及样本能否代表目标群体。"
        ]
      },
      {
        "heading": "第四步：区分“发生什么”“为什么”“之后会怎样”",
        "paragraphs": [
          "描述告诉我们测量到什么；解释提出原因；预测则估计某条件下未来可能发生的结果。后两项通常需要更强证据。",
          "例如，两个指标同时变化，不足以证明一个导致另一个。能够预测结果的模型，也不自动等于理解因果机制。"
        ]
      },
      {
        "heading": "第五步：说明建议、代价与下一步验证",
        "paragraphs": [
          "一份有用的分析简报除了结果，还应列出建议采取的行动、主要不确定性、决策失误的代价，以及可以增强或推翻判断的下一项证据。",
          "使用 AI 协助写代码和设计图表时，要核实数据访问权限、字段含义、计算结果和输出来源。"
        ]
      },
      {
        "heading": "从基础到作品集的学习路线",
        "paragraphs": [
          "从电子表格、筛选、汇总和清晰图表入手，再学习 SQL、抽样、基础统计、实验思维与数据可视化。逐渐加入业务领域知识与可复现的分析步骤。",
          "展示能力时，不必追求庞大的项目；能够解释问题、指标、证据、限制和行动的一页简报，更能体现决策能力。"
        ]
      }
    ],
    "exercise": {
      "title": "制作一页数据决策简报",
      "steps": [
        "选择公开或合成的数据集，提出具体业务问题。",
        "记录一个关键指标的计算定义及清理步骤。",
        "制作一张图表，并用清楚的语言解释观察到的结果。",
        "指出一项局限、另一种可能解释和下一次验证行动。"
      ],
      "success": "他人应能理解结论依据，知道哪部分仍不确定，并复现关键计算。"
    },
    "references": [
      {
        "title": "OECD｜《就业展望 2026》",
        "url": "https://www.oecd.org/en/publications/oecd-employment-outlook-2026_7e710f54-en.html"
      },
      {
        "title": "世界经济论坛｜2025 年技能展望",
        "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/"
      },
      {
        "title": "NIST｜生成式 AI 风险管理概况",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
      }
    ],
    "related": [
      {
        "title": "数据分析技能指南",
        "href": "/zh-CN/skills/data-analysis"
      },
      {
        "title": "数据分析师职业指南",
        "href": "/zh-CN/careers/data-analyst"
      }
    ],
    "sourceReviewedAt": "2026-11-10",
    "kind": "article"
  },
  "communication-skills-that-drive-career-success": {
    "slug": "communication-skills-that-drive-career-success",
    "title": "高信息量与 AI 协作时代，怎样提高职场沟通质量",
    "subtitle": "减少往返消息，让目标、责任和下一步变得清楚",
    "description": "职场沟通中文专题：先讲结果、建立任务交接、主动倾听、选择合适沟通渠道，并通过一周实验减少误解。",
    "introduction": [
      "在忙碌的团队里，发送更多消息不等于达成更好的理解。沟通应该让合适的人对结果、限制、责任和下一步形成共同认识。",
      "本文根据站内 2026 年 11 月更新的英文专题整理，强调可观察的工作结果，而不是过度追求措辞漂亮。"
    ],
    "sections": [
      {
        "heading": "工作信息越来越多，注意力却有限",
        "paragraphs": [
          "原文引用微软 2025 年对高信息量工作日的研究：在其特定数据集里，信息量最高的 20% 用户一天平均接收到约 275 次提醒。这个数字不能代表所有职场人士，却说明过多的通知可能侵占完成工作的注意力。",
          "OECD 2026 年的相关研究观察到合作环境、工作自主性与薪资之间的联系，但不能据此断言发送更多消息或采用某种沟通风格一定会让工资提高。"
        ]
      },
      {
        "heading": "第一步：在开头直接说明需要什么",
        "paragraphs": [
          "先告诉读者需要作出什么决定、采取什么行动，或了解什么重要变化，再解释背景。",
          "与其说“想跟进一下进度并讨论时间”，不如说“请批准将审核推迟到周四，因为必需的测试结果到周三才能得到”。"
        ]
      },
      {
        "heading": "第二步：把任务交接设计清楚",
        "paragraphs": [
          "交接时要说明五项信息：要交付什么、目前完成到哪里、谁是接收负责人、什么结果算合格，以及什么时候检查或升级。",
          "如果 AI 参与整理资料，还需要说明哪些内容已经核验、哪些仍需人工判断，不能把自动生成的内容当作默认正确。"
        ],
        "points": [
          "交付对象、当前状态、负责人。",
          "验收标准与明确的时间节点。",
          "遇到问题时的反馈和升级路径。"
        ]
      },
      {
        "heading": "第三步：根据对象调整信息细节",
        "paragraphs": [
          "技术团队可能需要错误重现步骤；业务负责人可能只需要影响、几个选项、风险和建议。提供适合对方职责的信息，而把更详细的证据放在可查阅的链接中。",
          "针对读者组织信息，不等于隐瞒问题。"
        ]
      },
      {
        "heading": "第四步：积极倾听并确认理解",
        "paragraphs": [
          "听清对方真正想达成什么、担心什么、哪些前提与你不同。可以通过复述确认：“我理解你更重视上线时间而不是保留全部功能，对吗？”",
          "这种检查往往能在项目返工之前发现理解偏差。"
        ]
      },
      {
        "heading": "第五步：把沟通变成可观察的结果",
        "paragraphs": [
          "重要对话应以具体决定、负责人和期限结束，必要时留下记录。相较于“有问题再联系我”，明确说明“由谁在何时完成什么”更容易推进工作。",
          "若涉及情绪、复杂分歧或敏感问题，应选择更适合的对话方式，而不是让长邮件链代替真正的讨论。"
        ]
      },
      {
        "heading": "用一周的小实验评估沟通成效",
        "paragraphs": [
          "先记录一周内需要多少次澄清、责任与时间被重复确认多少次、因验收标准不清造成多少返工。随后只改进一项做法，例如增加结构化任务交接，再比较下一周的结果。",
          "这种测量比单纯觉得自己“更有组织”更有价值。"
        ]
      }
    ],
    "exercise": {
      "title": "五分钟交接测试",
      "steps": [
        "写下一项工作更新，包含待做决定和支持证据。",
        "说明一个未解决风险、明确的负责人和截止日期。",
        "请同事不看额外说明复述下一步。",
        "修正对方理解有偏差的表达。"
      ],
      "success": "对方可以准确复述下一步，并知道谁负责、完成标准和时间。"
    },
    "references": [
      {
        "title": "Microsoft WorkLab｜无限工作日研究",
        "url": "https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday"
      },
      {
        "title": "OECD｜《就业展望 2026》",
        "url": "https://www.oecd.org/en/publications/oecd-employment-outlook-2026_7e710f54-en.html"
      }
    ],
    "related": [
      {
        "title": "沟通能力技能指南",
        "href": "/zh-CN/skills/communication"
      },
      {
        "title": "批判性思维技能指南",
        "href": "/zh-CN/skills/critical-thinking"
      }
    ],
    "sourceReviewedAt": "2026-11-10",
    "kind": "article"
  }
};
