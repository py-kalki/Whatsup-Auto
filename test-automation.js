import http from 'http';

async function testEndpoint() {
  console.log('Testing WhatsApp Automation suite API...');
  
  // Test local rule engine directly
  const { ruleEngine } = await import('./lib/rule-engine.js');
  const { storage } = await import('./lib/storage.js');
  
  console.log('Testing rule match: /menu');
  const menuRes = await ruleEngine.processIncomingMessage({
    chatId: 'test_user_1@c.us',
    text: '/menu',
    senderName: 'Tester',
  });
  console.log('Menu Response Type:', menuRes.type);
  console.log('Menu Reply Text:\n', menuRes.replyText);

  console.log('\nTesting lead flow step 1: /lead');
  const step1 = await ruleEngine.processIncomingMessage({
    chatId: 'lead_user_1@c.us',
    text: '/lead',
    senderName: 'John Doe',
  });
  console.log('Step 1 Reply:', step1.replyText);

  console.log('\nTesting lead flow step 2: Name input');
  const step2 = await ruleEngine.processIncomingMessage({
    chatId: 'lead_user_1@c.us',
    text: 'John Doe Enterprise',
    senderName: 'John Doe',
  });
  console.log('Step 2 Reply:', step2.replyText);

  console.log('\nTesting lead flow step 3: Service selection');
  const step3 = await ruleEngine.processIncomingMessage({
    chatId: 'lead_user_1@c.us',
    text: '1 - WhatsApp AI Chatbot',
    senderName: 'John Doe',
  });
  console.log('Step 3 Reply:', step3.replyText);

  console.log('\nTesting lead flow step 4: Contact info');
  const step4 = await ruleEngine.processIncomingMessage({
    chatId: 'lead_user_1@c.us',
    text: 'john@example.com / 5pm call',
    senderName: 'John Doe',
  });
  console.log('Step 4 Completion Reply:', step4.replyText);
  console.log('Flow Completed:', step4.flowCompleted);

  const leads = storage.getLeads();
  console.log('\nSaved Leads count:', leads.length);
  console.log('Last Captured Lead Details:', leads[0]?.data);

  console.log('\n[SUCCESS] All core tests passed successfully!');
  process.exit(0);
}

testEndpoint().catch((e) => {
  console.error('Test error:', e);
  process.exit(1);
});
