/* eslint-disable no-undef */
const FaqServices = require('../../src/services/FaqServices');
const assert = require('assert');

describe('FaqServices', () => {
  let createdFaq;
  it('.getAll()', async () => {
    await assert.rejects(FaqServices.getAll(), {
      name: 'Error',
      message: 'FAQS_NOT_FOUND',
    });
  });

  it('.getAnswered()', async () => {
    await assert.rejects(FaqServices.getAnswered(), {
      name: 'Error',
      message: 'FAQS_NOT_FOUND',
    });
  });

  it('.getUnanswered()', async () => {
    await assert.rejects(FaqServices.getUnanswered(), {
      name: 'Error',
      message: 'FAQS_NOT_FOUND',
    });
  });

  it('.create()', async () => {
    createdFaq = await FaqServices.create(
      'test@test.com',
      'Test Question',
      'Test Answer',
      'Test Category',
    );
    assert.equal(createdFaq.email, 'test@test.com');
    assert.equal(createdFaq.question, 'Test Question');
    assert.equal(createdFaq.answer, 'Test Answer');
    assert.equal(createdFaq.isAnswered, true);
    assert.equal(createdFaq.category, 'Test Category');
  });

  it('.create() no answer', async () => {
    const faq = await FaqServices.create('test@test.com', 'Test Question', '', 'Test Category');
    assert.equal(faq.email, 'test@test.com');
    assert.equal(faq.question, 'Test Question');
    assert.equal(faq.answer, '');
    assert.equal(faq.isAnswered, false);
    assert.equal(faq.category, 'Test Category');
  });

  it('.create() no category', async () => {
    const faq = await FaqServices.create('test@test.com', 'Test Question', 'Test Answer', '');
    assert.equal(faq.email, 'test@test.com');
    assert.equal(faq.question, 'Test Question');
    assert.equal(faq.answer, 'Test Answer');
    assert.equal(faq.isAnswered, true);
    assert.equal(faq.category, 'General');
  });

  it('.create() no category no answer', async () => {
    const faq = await FaqServices.create('test@test.com', 'Test Question', '', '');
    assert.equal(faq.email, 'test@test.com');
    assert.equal(faq.question, 'Test Question');
    assert.equal(faq.answer, '');
    assert.equal(faq.isAnswered, false);
    assert.equal(faq.category, 'General');
  });

  it('.getAll()', async () => {
    const faqs = await FaqServices.getAll();
    assert.equal(faqs.length, 4);
  });

  it('.getAnswered()', async () => {
    const faqs = await FaqServices.getAnswered();
    assert.equal(faqs.length, 2);
  });

  it('.getUnanswered()', async () => {
    const faqs = await FaqServices.getUnanswered();
    assert.equal(faqs.length, 2);
  });

  it('.delete(faqId)', async () => {
    const faq = await FaqServices.delete(createdFaq._id);
    assert.equal(faq.id, createdFaq.id);
  });

  it('.delete(faqId) invalid id', async () => {
    await assert.rejects(FaqServices.delete('createdFaq._id'), {
      name: 'Error',
      message: 'UNABLE_TO_DELETE_FAQ',
    });
  });

  it('.delete(faqId) no faq', async () => {
    await assert.rejects(FaqServices.delete('2b34b2b34b24'), {
      name: 'Error',
      message: 'FAQ_NOT_FOUND',
    });
  });

  it('.update(faqId, update)', async () => {
    const faq = await FaqServices.update(createdFaq._id, {
      question: 'Updated Question',
      answer: 'Updated Answer',
    });
    assert.equal(faq.id, createdFaq.id);
    assert.equal(faq.question, 'Updated Question');
    assert.equal(faq.answer, 'Updated Answer');
  });

  it('.update(faqId, update) invalid id', async () => {
    await assert.rejects(
      FaqServices.update('createdFaq._id', {
        question: 'Updated Question',
        answer: 'Updated Answer',
      }),
      {
        name: 'Error',
        message: 'UNABLE_TO_UPDATE_FAQ',
      },
    );
  });

  it('.update(faqId, update) no faq', async () => {
    await assert.rejects(
      FaqServices.update('2b34b2b34b24', {
        question: 'Updated Question',
        answer: 'Updated Answer',
      }),
      {
        name: 'Error',
        message: 'FAQ_NOT_FOUND',
      },
    );
  });
});
