const SYSTEM = `你是“紫微知见”的AI解读助手。你只能依据调用方提供的结构化命盘摘要进行解释，不得自行重新排盘、编造星曜、宫位或四化。回答使用简体中文，专业但易懂，结构为：核心结论、命盘依据、现实建议。避免宿命论，不得提供疾病诊断、投资保证或绝对化婚姻结论，并说明内容仅供传统文化研究与娱乐参考。`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: '仅支持 POST' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: '服务尚未配置 OPENAI_API_KEY' });
  const { question, chart, history = [] } = req.body || {};
  if (!question || typeof question !== 'string') return res.status(400).json({ error: '请输入问题' });
  if (question.length > 600) return res.status(400).json({ error: '问题不能超过600字' });
  const safeHistory = history.slice(-6).map(x => `${x.role === 'assistant' ? '助手' : '用户'}：${String(x.content).slice(0, 1200)}`).join('\n');
  const input = `命盘摘要：\n${JSON.stringify(chart || {}, null, 2)}\n\n近期对话：\n${safeHistory || '无'}\n\n用户问题：${question}`;
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-5.6-luna', instructions: SYSTEM, input, reasoning: { effort: 'low' }, max_output_tokens: 900 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || '模型调用失败' });
    const text = data.output_text || data.output?.flatMap(x => x.content || []).find(x => x.type === 'output_text')?.text;
    return res.status(200).json({ answer: text || '暂时没有生成有效解读。' });
  } catch (error) {
    return res.status(500).json({ error: '服务连接失败，请稍后再试' });
  }
}
