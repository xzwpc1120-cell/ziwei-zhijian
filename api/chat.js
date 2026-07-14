const RULES = [
  {
    keywords: ['事业', '工作', '职业', '求职', '升职'],
    title: '事业方向',
    conclusion: '这份演示命盘更强调规划、统筹与稳定推进的能力，适合承担需要判断和协调的工作。',
    basis: '示例结构中的命宫“紫微、天府”与官禄宫“武曲化科”，用于展示主星与四化信息如何转化为职业解读。',
    advice: '可以优先整理自己的核心能力、代表项目和可量化成果，再根据岗位要求逐项匹配。'
  },
  {
    keywords: ['财运', '财富', '收入', '赚钱', '理财'],
    title: '财富方向',
    conclusion: '演示结构倾向通过专业能力和长期积累获得稳定回报，不强调短期投机。',
    basis: '示例财帛宫使用“天相”，用于展示资源协调、规则意识与稳健经营的解释方式。',
    advice: '把收入目标拆分为主业提升、能力复利和风险储备，避免依据传统文化内容作投资决定。'
  },
  {
    keywords: ['感情', '婚姻', '恋爱', '伴侣'],
    title: '关系方向',
    conclusion: '这份演示命盘只用于展示关系议题的表达结构，不能据此判断具体婚姻结果。',
    basis: '当前版本没有接入完整夫妻宫、三方四正及行运数据，因此不做确定性结论。',
    advice: '现实关系更适合从沟通方式、边界、共同目标和实际相处情况进行判断。'
  },
  {
    keywords: ['性格', '优势', '特点', '能力'],
    title: '性格与优势',
    conclusion: '演示结构呈现出重视秩序、责任和整体判断的倾向，同时需要留意过度承担。',
    basis: '命宫示例“紫微、天府”用于演示如何从星曜组合提炼性格关键词，并非真实个人定论。',
    advice: '可以结合真实经历验证这些描述，只保留与自己长期行为一致的部分。'
  }
];

const DEFAULT_RULE = {
  title: '演示解读',
  conclusion: '当前内容用于展示“紫微知见”的问答与解读结构，不代表正式命盘结论。',
  basis: '系统使用虚构的示例星曜、宫位和四化信息，没有进行真实历法换算与完整排盘。',
  advice: '正式使用前需接入经过测试的确定性排盘引擎，再依据完整命盘进行分析。'
};

function createAnswer(question) {
  const rule = RULES.find(item => item.keywords.some(keyword => question.includes(keyword))) || DEFAULT_RULE;
  return `核心结论｜${rule.title}\n${rule.conclusion}\n\n命盘依据\n${rule.basis}\n\n现实建议\n${rule.advice}\n\n内容仅供传统文化研究与娱乐参考。`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: '仅支持 POST' });
  const { question } = req.body || {};
  if (!question || typeof question !== 'string') return res.status(400).json({ error: '请输入问题' });
  if (question.length > 600) return res.status(400).json({ error: '问题不能超过600字' });
  return res.status(200).json({ answer: createAnswer(question.trim()), mode: 'rule-demo' });
}
