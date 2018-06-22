const { VK } = require('vk-io');
const vk = new VK();

vk.setOptions({
    token: process.env.TOKEN
});

const { updates } = vk;

updates.setHearFallbackHandler(async (context, next) => {
	await context.send('Я временно не работаю, извини. Возможно меня снова улучшают, пожалуйста, потерпи немного.');
});

updates.use(async (context, next) => {
	if (context.is('message') && context.isOutbox()) {
		return;
	}

	try {
		await next();
	} catch (error) {
		console.error('Error:', error);
	}
});

async function run() {
	await vk.updates.startPolling();
	console.log('Polling started');
}

run().catch(console.error);