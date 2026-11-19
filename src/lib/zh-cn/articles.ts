import type { ChineseEdition } from './editorial-types';

// Editorial adaptations from the existing Nov 2026 English articles.
export const CHINESE_ARTICLE_EDITIONS: Readonly<Record<string, ChineseEdition>> = {
  "ai-skills-2024-guide": {
    "slug": "ai-skills-2024-guide",
    "title": "2026 年职场 AI 技能：从提示词到负责任的任务委派",
    "subtitle": "让 AI 在可核验的工作流程中发挥作用，而不是替人承担责任",
    "description": "用简体中文了解 2026 年 AI 职场技能，包括任务界定、人工核验、数据保护与 30 分钟练习。",
    "introduction": [
      "AI 能够协助写作、研究和资料整理，但熟练使用工具与作出可靠判断并不是一回事。真正有价值的能力是明确目标、选择合适任务、保护资料、验证输出，并让最终决定始终有人负责。",
      "这份中文专题基于 Modern Skill Lab 2026 年 11 月更新的英文文章编写，保留主要实用框架，部分研究细节可在英文原文及文末来源中查阅。"
    ],
    "sections": [
      {
        "heading": "使用 AI 不等于真正掌握 AI",
        "paragraphs": [
          "英文原文援引 OECD《数字经济与社会展望 2026》：所采用的最近一轮跨国调查中，约 37% 的 16 至 74 岁成年人表示过去三个月使用过生成式 AI，约 19% 用于工作、约 30% 用于私人用途。这是特定调查范围内的使用比例，不是能力或正确率测量。",
          "OECD 还提醒，某个职业包含 AI 可辅助的任务，并不意味着整个岗位必然自动化。判断、协调、责任与专业知识仍然重要。"
        ]
      },
      {
        "heading": "步骤一：从结果与核验标准定义任务",
        "paragraphs": [
          "不要只写“分析用户反馈”。更好的任务说明会交代研究对象、时间段、批准使用的材料、输出格式和证据要求。先确定结果要支持什么决定，再决定用什么工具。"
        ]
      },
      {
        "heading": "步骤二：把 AI 生成与人的责任分开",
        "paragraphs": [
          "可将流程分成四类：AI 可以起草或转换；AI 可以提出选项但由人选择；重要证据由具备能力的人核验；最终决策由明确的责任人批准。",
          "一个看似完整的报告，如果缺少来源、审核和决策责任，仍然可能不适合使用。"
        ],
        "points": [
          "起草不等于事实已核实。",
          "解释不等于对组织后果作出判断。",
          "高风险结果应保留人工审核和必要的升级路径。"
        ]
      },
      {
        "heading": "步骤三：按照错误后果调整验证深度",
        "paragraphs": [
          "创意标题清单可以允许更多试错；客户建议、财务数字、就业或安全决策则需要更严格的审查。核验时直接打开原始资料、重算重要数字，记录不确定性，并评估模型可能忽视的背景。",
          "NIST《生成式人工智能风险管理概况》强调系统性的风险管理，不是发布之前做一次形式检查即可。"
        ]
      },
      {
        "heading": "步骤四：确保资料被允许使用",
        "paragraphs": [
          "在上传任何个人、客户、内部、受监管或安全敏感数据前，必须确认工具、权限和处理方式符合组织要求。方便和速度不能替代保密责任。"
        ]
      },
      {
        "heading": "步骤五：衡量完成整个流程后的真实收益",
        "paragraphs": [
          "对比使用 AI 前后的总耗时、审核工作量、错误类型和交付质量。若核验与返工时间抵消了生成速度，表面提高的效率可能没有实际价值。",
          "有用的 AI 素养是可持续的方法：明确任务、识别限制、检验结果和承担责任，而不是收集最多提示词模板。"
        ]
      }
    ],
    "exercise": {
      "title": "30 分钟练习：一张 AI 任务委派卡",
      "steps": [
        "选择一个熟悉、低风险且不包含敏感信息的任务。",
        "明确结果、允许使用的资料、限制及验收标准。",
        "分别写出 AI 可完成、需要人工核实以及必须人工批准的步骤。",
        "试运行一次，记下实际错误、核验时间和下次改进点。"
      ],
      "success": "一位同事应该能够理解如何重复该流程，哪些结论可以使用，以及由谁负责最终结果。"
    },
    "references": [
      {
        "title": "OECD｜Digital Economy and Society Outlook 2026",
        "url": "https://www.oecd.org/en/publications/oecd-digital-economy-and-society-outlook-2026_022ed474-en.html"
      },
      {
        "title": "OECD｜Skills in the AI age",
        "url": "https://www.oecd.org/en/publications/skills-in-the-ai-age_972bd15e-en.html"
      },
      {
        "title": "NIST｜Generative AI Profile",
        "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
      }
    ],
    "related": [
      {
        "title": "AI 素养技能指南",
        "href": "/zh-CN/skills/ai-literacy"
      },
      {
        "title": "批判性思维",
        "href": "/zh-CN/skills/critical-thinking"
      }
    ],
    "sourceReviewedAt": "2026-11-10",
    "kind": "article"
  },
  "data-skills-career-growth": {
    "slug": "data-skills-career-growth",
    "title": "2026 年数据技能：让分析真正支持决策",
    "subtitle": "从业务问题、指标定义与数据质量，到可复核的行动建议",
    "description": "中文数据技能专题，学习如何区分相关性与因果、使用数据建立可信建议，并制作职场数据作品集。",
    "introduction": [
      "自动化工具已经能够快速制作图表、SQL 查询和摘要。数据专业人士更需要证明自己理解研究问题、知道数据从哪里来，以及能向业务团队解释结论和局限。",
      "这份中文内容整理自网站 2026 年 11 月更新的英文专题，强调数据证据如何变成可靠建议，而不是只展示技术工具。"
    ],
    "sections": [
      {
        "heading": "先分清“有关联”和“有因果”",
        "paragraphs": [
          "OECD《就业展望 2026》讨论了非正规培训与工资的正向关联，但同时指出高收入职业也可能更容易获得培训。相关研究并未证明“参加一次培训就一定涨薪”。",
          "分析师应记录调查期、样本与比较组，并说明研究是否能够支持因果判断。AI 绘制的图表也同样需要这些说明。"
        ]
      },
      {
        "heading": "第一步：确认需要作出什么决定",
        "paragraphs": [
          "“分析客户留存”范围过大。可以问：“首周哪些行为与用户 90 天后仍然活跃有关？我们应该试验哪一项新用户引导改进？”问题应明确对象、时间范围、结果指标及可能行动。"
        ]
      },
      {
        "heading": "第二步：提前写下指标计算规则",
        "paragraphs": [
          "“活跃”“转化”“质量”或“流失”可能有不同定义。计算前应明确统计单位、分子、分母、纳入排除条件、时间窗口和来源系统，并标出缺失或延迟的数据。"
        ],
        "points": [
          "对关键指标使用同一口径。",
          "识别重复记录、异常与选择偏差。",
          "保留数据提取和清洗步骤。"
        ]
      },
      {
        "heading": "第三步：检查数据是怎样收集的",
        "paragraphs": [
          "客服工单反映被报告的问题，却不能直接代表所有遭遇问题的客户。分析必须检查样本是否具有代表性、哪些人没有进入数据，以及记录方式是否发生变化。"
        ]
      },
      {
        "heading": "第四步：分别表达描述、解释与预测",
        "paragraphs": [
          "描述是“发生了什么”；解释是“为什么发生”；预测是“将来可能怎样”。从一个层级跳到另一个层级通常需要更多证据。两个变化同时出现，并不自动证明其中一个造成另一个。"
        ]
      },
      {
        "heading": "第五步：说清建议与不确定性",
        "paragraphs": [
          "一份实用分析要回答：建议采取什么行动，最重要的不确定性是什么，判断失误的成本有多大，下一步如何验证。AI 可协助写代码和生成图表，但需审核公式、数据权限与原始资料。"
        ]
      },
      {
        "heading": "从基础工具走向可展示的作品",
        "paragraphs": [
          "从电子表格、筛选、汇总和简单图表开始，再逐步掌握 SQL、统计和实验思维。选择一个公开或合成数据集，保留分析流程，并给出一页决策简报。",
          "作品集应该展示问题、方法、关键证据、局限和下一步，而不只是视觉效果。"
        ]
      }
    ],
    "exercise": {
      "title": "30 分钟实践：制作一页数据决策简报",
      "steps": [
        "选择公开或合成的数据，写下一项明确的业务决定。",
        "写出核心指标、时间范围和计算方法。",
        "制作一张有解释的图表，列出一项数据局限。",
        "写出建议、替代解释与下一步验证行动。"
      ],
      "success": "他人能够复核关键计算，并理解结论在哪些条件下适用。"
    },
    "references": [
      {
        "title": "OECD｜Employment Outlook 2026",
        "url": "https://www.oecd.org/en/publications/oecd-employment-outlook-2026_7e710f54-en.html"
      },
      {
        "title": "WEF｜Future of Jobs 2025",
        "url": "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/"
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
    "title": "高信息量时代的职场沟通：减少误解和返工",
    "subtitle": "让目标、任务交接、责任人和下一步真正清楚",
    "description": "中文职场沟通专题：先说明结果、设计交接、主动倾听、选择渠道，并通过一周实验改进工作沟通。",
    "introduction": [
      "沟通的成功标准不是发送了多少消息，而是合适的人是否对目标、限制、责任及下一步形成共同理解。频繁通知有时会占用真正完成工作的注意力。",
      "本文依据站内 2026 年 11 月更新的英文文章编写，介绍一套可以在团队和远程工作中使用的沟通方法。"
    ],
    "sections": [
      {
        "heading": "工作信息增加，不代表共同理解增加",
        "paragraphs": [
          "原文引用微软 2025 年针对高消息量工作模式的研究：在其数据集内，消息量最高的 20% 用户一天平均接收约 275 次提醒。这不能代表所有人，但提醒我们，沟通方式也需要考虑注意力成本。",
          "OECD 2026 年关于合作工作环境与薪酬的研究描述的是观察关联，不能用来证明发送更多消息会提高工资。"
        ]
      },
      {
        "heading": "第一步：先给读者一个清楚的结果或请求",
        "paragraphs": [
          "与其说“想跟进之前讨论的文档和时间问题”，不如说“请批准将审核改到周四；两项必需测试的结果到周三才能取得”。第一句就让对方知道要做什么以及原因。"
        ]
      },
      {
        "heading": "第二步：给交接任务设置五项要素",
        "paragraphs": [
          "一次好的任务交接应明确交付成果、当前状态、接收负责人、验收标准和截止日期或升级条件。AI 协助制作的材料，也需要指定资料来源和人工核验责任。"
        ],
        "points": [
          "完成什么？目前状态是什么？",
          "谁负责接收和确认？",
          "怎样算达到标准？",
          "何时复核，出现问题找谁？"
        ]
      },
      {
        "heading": "第三步：针对读者组织信息",
        "paragraphs": [
          "技术人员可能需要故障复现步骤，业务负责人可能更需要影响、风险与建议。调整细节并不等于隐瞒信息；应确保需要的人能够找到更深入的证据。"
        ]
      },
      {
        "heading": "第四步：积极倾听，检查对方的真实关注点",
        "paragraphs": [
          "不仅要听见字面内容，还要确认目标、限制及双方可能不同的假设。例如：“我理解上线时间比保留所有附加功能更重要，对吗？”这种复述有助于防止返工。"
        ]
      },
      {
        "heading": "第五步：明确负责人、行动和期限",
        "paragraphs": [
          "重要决定要有记录、责任人和明确的下一步。“有问题再说”无法替代可执行的交接。沟通方式应因问题而异：敏感或模糊的议题可能需要直接讨论，重要决定则需要书面留痕。"
        ]
      },
      {
        "heading": "如何知道沟通真的改善了？",
        "paragraphs": [
          "先记录一周内需要重复确认的次数、责任不清的情况，以及因验收标准模糊而返工的工作量。然后只引入一项变化，比如结构化任务交接，再比较下一周。"
        ]
      }
    ],
    "exercise": {
      "title": "五分钟练习：写好一条工作交接消息",
      "steps": [
        "清楚写下需要对方作出的决定或行动。",
        "补充关键证据、一个风险、负责人和时间。",
        "请一位同事在不听额外解释的情况下复述下一步。",
        "根据复述结果消除歧义。"
      ],
      "success": "对方能够准确说明什么事、由谁负责、在什么时候完成。"
    },
    "references": [
      {
        "title": "Microsoft WorkLab｜Infinite Workday 2025",
        "url": "https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday"
      },
      {
        "title": "OECD｜Employment Outlook 2026",
        "url": "https://www.oecd.org/en/publications/oecd-employment-outlook-2026_7e710f54-en.html"
      }
    ],
    "related": [
      {
        "title": "职场沟通技能指南",
        "href": "/zh-CN/skills/communication"
      },
      {
        "title": "批判性思维",
        "href": "/zh-CN/skills/critical-thinking"
      }
    ],
    "sourceReviewedAt": "2026-11-10",
    "kind": "article"
  }
};
