
const {configuration, OpenAIApi} = require('openai');

const confi =new configuration({apikey:'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'});
const openai =new OpenAIApi(confi);

export async function Sendmssgtoopenai(message){
    const res = await openai.createCompletion({
        model:'text-davinci-003',
        prompt:message,
        temperature:0.7,
        max_tokens:256,
        top_p:1,
        frequency_penalty:0,
        presense_penalty:0
    });
    return res.data.choices[0].text;
}
