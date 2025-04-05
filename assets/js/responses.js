// responses.js

const responses = [
    {
      question: ['xin chào', 'chào bạn', 'hello'],
      response: 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?'
    },
    {
      question: ['giờ', 'thời gian'],
      response: () => {
        const now = new Date();
        return `Bây giờ là ${now.getHours()} giờ ${now.getMinutes()} phút`;
      }
    },
    {
      question: ['cảm ơn'],
      response: 'Không có gì! Rất vui được giúp bạn.'
    },
    {
      question: ['tên bạn là gì?', 'bạn tên gì?'],
      response: 'Tôi là một trợ lý ảo, không có tên cụ thể, nhưng bạn có thể gọi tôi là Bot.'
    },
    {
      question: ['bạn làm gì?', 'trợ lý ảo làm gì?'],
      response: 'Tôi có thể giúp bạn với các câu hỏi và hỗ trợ bạn trong việc tìm kiếm thông tin.'
    },
    {
      question: ['help', 'giúp tôi', 'trợ giúp'],
      response: 'Tôi có thể giúp bạn với nhiều vấn đề. Bạn có thể hỏi về thời gian, hoặc các câu hỏi cơ bản khác.'
    }
  ];
  
  function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    for (let i = 0; i < responses.length; i++) {
      const { question, response } = responses[i];
      if (question.some(q => lowerMessage.includes(q))) {
        if (typeof response === 'function') {
          return response();
        }
        return response;
      }
    }
    return 'Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể hỏi cách khác không?';
  }
  