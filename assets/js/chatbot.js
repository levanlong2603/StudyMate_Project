class StudyMateChatbot {
  constructor() {
    this.userData = {};
    this.chatHistory = [];
    this.isFirstInteraction = true;
    this.currentContext = null;
    this.initUI();
    this.setupEventListeners();
    this.loadUserPreferences();
    this.greetUser();
  }

  // Initialize chatbot UI
  initUI() {
    // Create main container
    this.chatbotContainer = document.createElement('div');
    this.chatbotContainer.id = 'studymate-chatbot';
    this.chatbotContainer.className = 'chatbot-container hidden';
    this.chatbotContainer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title">
          <span class="chatbot-icon">📚</span>
          <h3>StudyMate Assistant</h3>
        </div>
        <div class="chatbot-controls">
          <button class="minimize-btn">−</button>
          <button class="close-btn">×</button>
        </div>
      </div>
      <div class="chatbot-body">
        <div class="chatbot-messages" id="chat-messages"></div>
        <div class="chatbot-input-area">
          <textarea id="user-input" placeholder="Nhập câu hỏi hoặc yêu cầu của bạn..." rows="1"></textarea>
          <button id="send-btn">Gửi</button>
        </div>
        <div class="chatbot-footer">
          <div class="quick-actions">
            <button class="quick-btn" data-action="find-docs">Tìm tài liệu</button>
            <button class="quick-btn" data-action="my-files">Tài liệu của tôi</button>
            <button class="quick-btn" data-action="ptit-library">Thư viện PTIT</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.chatbotContainer);
    
    // Create toggle button
    this.toggleButton = document.createElement('div');
    this.toggleButton.className = 'chatbot-toggle';
    this.toggleButton.innerHTML = `
      <span class="chatbot-toggle-icon">💬</span>
      <span class="chatbot-notification"></span>
    `;
    document.body.appendChild(this.toggleButton);
    
    // Add typing indicator
    this.typingIndicator = document.createElement('div');
    this.typingIndicator.className = 'typing-indicator hidden';
    this.typingIndicator.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="typing-text">StudyMate đang trả lời...</span>
    `;
    document.querySelector('.chatbot-messages').appendChild(this.typingIndicator);
  }

  // Set up event listeners
  setupEventListeners() {
    // Toggle chatbot
    this.toggleButton.addEventListener('click', () => this.toggleChatbot());
    
    // Close and minimize
    document.querySelector('.close-btn').addEventListener('click', () => this.closeChatbot());
    document.querySelector('.minimize-btn').addEventListener('click', () => this.minimizeChatbot());
    
    // Send message
    document.getElementById('send-btn').addEventListener('click', () => this.processUserInput());
    document.getElementById('user-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.processUserInput();
      }
    });
    
    // Auto-resize textarea
    document.getElementById('user-input').addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        this.handleQuickAction(action);
      });
    });
  }

  // UI control methods
  toggleChatbot() {
    this.chatbotContainer.classList.toggle('hidden');
    this.toggleButton.classList.toggle('active');
    if (!this.chatbotContainer.classList.contains('hidden')) {
      document.getElementById('user-input').focus();
    }
  }

  closeChatbot() {
    this.chatbotContainer.classList.add('hidden');
    this.toggleButton.classList.remove('active');
  }

  minimizeChatbot() {
    this.chatbotContainer.classList.toggle('minimized');
    const minimizeBtn = document.querySelector('.minimize-btn');
    if (this.chatbotContainer.classList.contains('minimized')) {
      minimizeBtn.textContent = '+';
    } else {
      minimizeBtn.textContent = '−';
      document.getElementById('user-input').focus();
    }
  }

  // Core functionality
  async processUserInput() {
    const inputElement = document.getElementById('user-input');
    const userMessage = inputElement.value.trim();
    
    if (userMessage === '') return;
    
    // Add user message to chat
    this.addMessage('user', userMessage);
    inputElement.value = '';
    inputElement.style.height = 'auto';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Process after a small delay to allow UI to update
    setTimeout(async () => {
      try {
        // Process the message
        const response = await this.generateResponse(userMessage);
        
        // Add bot response
        this.addMessage('bot', response);
        
        // Update context if needed
        this.updateContext(userMessage);
        
      } catch (error) {
        console.error('Error processing message:', error);
        this.addMessage('bot', 'Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.');
      } finally {
        this.hideTypingIndicator();
      }
    }, 300);
  }

  // Message handling
  addMessage(sender, content, isHtml = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    if (isHtml) {
      messageElement.innerHTML = content;
    } else {
      messageElement.textContent = content;
    }
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to chat history
    this.chatHistory.push({
      sender,
      content,
      timestamp: new Date().toISOString()
    });
    
    // Limit chat history to 50 messages
    if (this.chatHistory.length > 50) {
      this.chatHistory.shift();
    }
  }

  // Typing indicator
  showTypingIndicator() {
    this.typingIndicator.classList.remove('hidden');
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
  }

  hideTypingIndicator() {
    this.typingIndicator.classList.add('hidden');
  }

  // Quick actions handler
  handleQuickAction(action) {
    let message = '';
    switch(action) {
      case 'find-docs':
        message = 'Tôi muốn tìm tài liệu học tập';
        break;
      case 'my-files':
        message = 'Hiển thị tài liệu của tôi';
        break;
      case 'ptit-library':
        message = 'Kết nối với thư viện PTIT';
        break;
      default:
        return;
    }
    
    document.getElementById('user-input').value = message;
    this.processUserInput();
  }

  // Response generation
  async generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (this.isFirstInteraction || this.isGreeting(lowerMessage)) {
      this.isFirstInteraction = false;
      return this.getGreetingResponse();
    }
    
    // Check for farewell
    if (this.isFarewell(lowerMessage)) {
      return this.getFarewellResponse();
    }
    
    // Check for help request
    if (this.isHelpRequest(lowerMessage)) {
      return this.getHelpResponse();
    }
    
    // Check for document search
    if (this.isDocumentSearch(lowerMessage)) {
      return this.handleDocumentSearch(userMessage);
    }
    
    // Check for personal files request
    if (this.isPersonalFilesRequest(lowerMessage)) {
      return this.handlePersonalFilesRequest();
    }
    
    // Check for PTIT library request
    if (this.isPTITLibraryRequest(lowerMessage)) {
      return this.handlePTITLibraryRequest();
    }
    
    // Check for specific subjects
    const subjectResponse = this.checkForSubjectInquiry(lowerMessage);
    if (subjectResponse) {
      return subjectResponse;
    }
    
    // Default fallback
    return this.getFallbackResponse();
  }

  // Response helper methods
  isGreeting(message) {
    const greetings = ['xin chào', 'hello', 'hi', 'chào', 'hey', 'có ai không'];
    return greetings.some(greet => message.includes(greet));
  }

  getGreetingResponse() {
    const greetings = [
      `Chào bạn! Mình là StudyMate Assistant, trợ lý ảo của hệ thống StudyMate. Mình có thể giúp gì cho bạn hôm nay? 😊`,
      `Xin chào! Mình là trợ lý StudyMate. Bạn cần tìm tài liệu hay hỗ trợ gì về học tập tại PTIT nhỉ? 📚`,
      `Chào bạn! Mình ở đây để giúp bạn tìm kiếm tài liệu, quản lý học tập và kết nối với thư viện PTIT. Bạn cần gì ạ? ✨`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  isFarewell(message) {
    const farewells = ['tạm biệt', 'bye', 'goodbye', 'see you', 'thôi'];
    return farewells.some(farewell => message.includes(farewell));
  }

  getFarewellResponse() {
    const farewells = [
      'Tạm biệt bạn! Chúc bạn học tập hiệu quả nhé! 😊',
      'Hẹn gặp lại bạn! Đừng ngần ngại quay lại nếu cần hỗ trợ nhé! ❤️',
      'Tạm biệt! Nếu cần tìm tài liệu hay hỗ trợ học tập, bạn cứ quay lại nhé! ✨'
    ];
    return farewells[Math.floor(Math.random() * farewells.length)];
  }

  isHelpRequest(message) {
    const helpPhrases = ['giúp', 'hỗ trợ', 'làm sao', 'hướng dẫn', 'help', 'support'];
    return helpPhrases.some(phrase => message.includes(phrase));
  }

  getHelpResponse() {
    return `Mình có thể giúp bạn với các chức năng sau:\n\n` +
    `🔍 Tìm kiếm tài liệu: Tìm giáo trình, bài giảng, đề thi theo môn học\n` +
    `📂 Quản lý tài liệu cá nhân: Lưu trữ và tổ chức tài liệu của bạn\n` +
    `🏫 Kết nối thư viện PTIT: Tìm sách, tài liệu từ thư viện trường\n` +
    `⏰ Nhắc nhở học tập: Thiết lập lịch học, nhắc hạn nộp bài\n\n` +
    `Bạn cần hỗ trợ cụ thể về mục nào ạ?`;
  }

  isDocumentSearch(message) {
    const keywords = ['tìm tài liệu', 'tìm sách', 'tìm giáo trình', 'bài giảng', 'đề thi', 'tài liệu môn'];
    return keywords.some(keyword => message.includes(keyword));
  }

  async handleDocumentSearch(message) {
    // Extract subject from message
    const subject = this.extractSubjectFromMessage(message);
    
    if (subject) {
      // Simulate API call to search for documents
      try {
        const results = [
          { title: "Giáo trình học cơ bản", type: "PDF", link: "https://example.com/giáo-trình" },
          { title: "Bài giảng môn học", type: "PPT", link: "https://example.com/bài-giảng" },
          { title: "Đề thi cuối kỳ học", type: "PDF", link: "https://example.com/đề-thi" },
          { title: "Đề thi cuối kỳ học", type: "PDF", link: "https://example.com/đề-thi" }
        ];
        
        
        if (results.length > 0) {
          let response = `Mình tìm thấy ${results.length} tài liệu về ${subject}:\n\n`;
        
          results.slice(0, 3).forEach(doc => {
            response += `📄 ${doc.title} - ${doc.type}\n`;
            response += `🔗 ${doc.link}\n\n`;
          });
          
          if (results.length > 3) {
            response += `Và ${results.length - 3} tài liệu khác. Bạn muốn xem thêm không?`;
          }
          
          return response;
        }
        
        else {
          return `Mình không tìm thấy tài liệu nào về <strong>${subject}</strong>. Bạn muốn tìm kiếm với từ khóa khác không?`;
        }
      } catch (error) {
        console.error('Search error:', error);
        return 'Xin lỗi, có lỗi khi tìm kiếm tài liệu. Vui lòng thử lại sau.';
      }
    } else {
      return 'Bạn muốn tìm tài liệu về môn học nào? Vui lòng cho mình biết tên môn học hoặc chủ đề cụ thể nhé!';
    }
  }

  isPersonalFilesRequest(message) {
    const keywords = ['tài liệu của tôi', 'file của tôi', 'tài liệu đã lưu', 'tài liệu cá nhân'];
    return keywords.some(keyword => message.includes(keyword));
  }

  handlePersonalFilesRequest() {
    // Check if user is logged in
    if (!this.userData.userId) {
      return 'Bạn cần đăng nhập để xem tài liệu cá nhân. Vui lòng đăng nhập và thử lại nhé!';
    }
    
    // Simulate fetching personal files
    const folders = [
      { name: 'Lập trình hướng đối tượng', count: 12 },
      { name: 'Mạng máy tính', count: 8 },
      { name: 'Cơ sở dữ liệu', count: 15 }
    ];
    
    let response = `Bạn có ${folders.length} thư mục tài liệu:\n\n`;
    folders.forEach(folder => {
      response += `📁 <strong>${folder.name}</strong> (${folder.count} tài liệu)\n`;
    });
    
    response += '\nBạn muốn mở thư mục nào?';
    
    return response;
  }

  isPTITLibraryRequest(message) {
    const keywords = ['thư viện ptit', 'kết nối thư viện', 'sách thư viện', 'mượn sách'];
    return keywords.some(keyword => message.includes(keyword));
  }

  handlePTITLibraryRequest() {
    return `Bạn có thể kết nối với thư viện PTIT để:\n\n` +
      `🔍 Tìm sách giáo trình theo môn học\n` +
      `📚 Kiểm tra tình trạng mượn sách\n` +
      `⏳ Xem lịch sử mượn trả\n` +
      `📌 Đặt giữ sách trước\n\n` +
      `Bạn muốn thực hiện thao tác nào?`;
  }

  checkForSubjectInquiry(message) {
    const subjects = {
      'lập trình': 'Bạn đang tìm tài liệu về lập trình ạ? PTIT có nhiều giáo trình hay về C++, Java, Python. Mình có thể gợi ý một số tài liệu nếu bạn cần!',
      'mạng máy tính': 'Môn Mạng máy tính có các tài liệu quan trọng về TCP/IP, routing, switching. Bạn cần tài liệu lý thuyết hay bài tập thực hành?',
      'cơ sở dữ liệu': 'Tài liệu Cơ sở dữ liệu thường tập trung vào SQL, ERD, normalization. Mình có thể gợi ý một số sách hay về MySQL và PostgreSQL.',
      'toán rời rạc': 'Toán rời rạc có nhiều tài liệu về đồ thị, logic, tổ hợp. Bạn cần tài liệu tiếng Việt hay tiếng Anh?'
    };
    
    for (const [subject, response] of Object.entries(subjects)) {
      if (message.includes(subject)) {
        return response;
      }
    }
    
    return null;
  }

  getFallbackResponse() {
    const fallbacks = [
      'Xin lỗi, mình chưa hiểu rõ yêu cầu của bạn. Bạn có thể diễn đạt cách khác được không ạ?',
      'Mình chưa nắm bắt được câu hỏi. Bạn đang cần hỗ trợ về tài liệu, thư viện hay vấn đề học tập nào ạ?',
      'Hiện mình chưa có thông tin về yêu cầu này. Bạn muốn tìm hiểu về chủ đề gì cụ thể hơn không?',
      'Câu hỏi của bạn khá thú vị! Mình có thể giúp gì liên quan đến tài liệu học tập tại PTIT không ạ?'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Utility methods
  extractSubjectFromMessage(message) {
    // Simple subject extraction - can be enhanced with NLP
    const subjectKeywords = ['môn', 'học phần', 'tài liệu', 'sách', 'giáo trình', 'bài giảng'];
    for (const keyword of subjectKeywords) {
      if (message.includes(keyword)) {
        // Extract text after keyword
        const startIndex = message.indexOf(keyword) + keyword.length;
        return message.substring(startIndex).trim().split(' ')[0];
      }
    }
    return null;
  }

  async searchDocuments(query) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - in real app this would be an API call
    const mockResults = [
      { 
        title: `Giáo trình ${query} cơ bản`, 
        type: 'PDF', 
        link: '#',
        subject: query,
        year: 2022
      },
      { 
        title: `Bài giảng môn ${query}`, 
        type: 'PPT', 
        link: '#',
        subject: query,
        year: 2023
      },
      { 
        title: `Đề thi cuối kỳ ${query}`, 
        type: 'PDF', 
        link: '#',
        subject: query,
        year: 2021
      }
    ];
    
    return mockResults;
  }

  // User preferences
  loadUserPreferences() {
    // In a real app, this would load from localStorage or API
    this.userData = {
      userId: 'user123', // Would be set after login
      preferredSubjects: ['Lập trình', 'Mạng máy tính'],
      savedDocuments: [],
      lastSearch: null
    };
  }

  // Context management
  updateContext(message) {
    // Simple context tracking - can be enhanced
    if (this.isDocumentSearch(message)) {
      this.currentContext = 'document_search';
    } else if (this.isPersonalFilesRequest(message)) {
      this.currentContext = 'personal_files';
    } else if (this.isPTITLibraryRequest(message)) {
      this.currentContext = 'ptit_library';
    } else {
      this.currentContext = null;
    }
  }

  // Initial greeting
  greetUser() {
    setTimeout(() => {
      this.addMessage('bot', this.getGreetingResponse());
    }, 1000);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.studyMateBot = new StudyMateChatbot();
});

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    transition: all 0.3s ease;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .chatbot-container.hidden {
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
  }
  
  .chatbot-container.minimized {
    height: 60px;
  }
  
  .chatbot-header {
    background:rgb(156, 35, 35);
    color: white;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  
  .chatbot-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .chatbot-icon {
    font-size: 20px;
  }
  
  .chatbot-controls button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0 5px;
    opacity: 0.8;
  }
  
  .chatbot-controls button:hover {
    opacity: 1;
  }
  
  .chatbot-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .chatbot-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background: #f5f7fa;
  }
  
  .message {
    margin-bottom: 12px;
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 80%;
    line-height: 1.4;
    position: relative;
    word-wrap: break-word;
  }
  
  .user-message {
    background:rgb(175, 74, 74);
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 4px;
  }
  
  .bot-message {
    background: white;
    color: #333;
    margin-right: auto;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .chatbot-input-area {
    display: flex;
    padding: 10px;
    border-top: 1px solid #eee;
    background: white;
  }
  
  #user-input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 15px;
    resize: none;
    outline: none;
    max-height: 100px;
    font-family: inherit;
  }
  
  #send-btn {
    background:rgb(175, 74, 74);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0 15px;
    margin-left: 8px;
    cursor: pointer;
  }
  
  #send-btn:hover {
    background:rgb(159, 58, 58);
  }
  
  .chatbot-footer {
    padding: 10px;
    background: white;
    border-top: 1px solid #eee;
  }
  
  .quick-actions {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  
  .quick-btn {
    background: #f0f4ff;
    color:rgb(175, 74, 74);
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .quick-btn:hover {
    background: #e0e4ff;
  }
  
  .chatbot-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background:rgb(146, 32, 38);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    z-index: 999;
    transition: all 0.3s ease;
  }
  
  .chatbot-toggle:hover {
    background:rgb(159, 58, 58);
    transform: scale(1.05);
  }
  
  .chatbot-toggle.active {
    background:rgb(143, 42, 42);
  }
  
  .chatbot-notification {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 10px;
    height: 10px;
    background: #ff4757;
    border-radius: 50%;
    display: none;
  }
  
  .typing-indicator {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 10px 15px;
    background: white;
    border-radius: 18px;
    max-width: 80%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .typing-indicator.hidden {
    display: none;
  }
  
  .typing-dots {
    display: flex;
    margin-right: 8px;
  }
  
  .typing-dots span {
    width: 8px;
    height: 8px;
    background: #ccc;
    border-radius: 50%;
    margin: 0 2px;
    animation: typingAnimation 1.4s infinite ease-in-out;
  }
  
  .typing-dots span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  .typing-text {
    font-size: 14px;
    color: #666;
  }
  
  @keyframes typingAnimation {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    .chatbot-container {
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
    
    .chatbot-toggle {
      bottom: 10px;
      right: 10px;
    }
  }
`;
document.head.appendChild(style);