// This file (model.js) contains all the logic for loading the model and running predictions.

import type { PipelineType } from '@xenova/transformers';

class MyClassificationPipeline {
    // NOTE: Replace this with your own task and model
    static task: PipelineType = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: any = null;

    static async getInstance(progress_callback: Function = null) {
        if (this.instance === null) {
            // Dynamically import the Transformers.js library
            let { pipeline, env } = await import('@xenova/transformers');

            // NOTE: Uncomment this to change the cache directory
            // env.cacheDir = './.cache';

            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

// The run function is used by the `transformers:run` event handler.
export async function run(_event: any, text: string) {
    console.log('text', text)
    const classifier = await MyClassificationPipeline.getInstance();
    console.log('classifier', classifier)
    const result = await classifier(text);
    console.log('result', result)
    return result
}