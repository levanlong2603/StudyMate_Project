document.addEventListener('DOMContentLoaded', function() {
    // Sample document data (you'll expand this with more documents)
    const documents = [
        { id: 1, title: "Giải Tích Hàm 1 Biến", author: "Phạm Ngọc Anh", year: 2020, code: "MATH101", type: "BÀI GIẢNG" },
        { id: 2, title: "Toán Rời Rạc 2", author: "Phan Thị Hà", year: 2021, code: "MATH202", type: "BÀI GIẢNG" },
        { id: 3, title: "Toán Rời Rạc 2", author: "Ngô Xuân Bách", year: 2021, code: "MATH202", type: "BÀI GIẢNG" },
        { id: 4, title: "An Toàn Và Bảo Mật Hệ Thống Thông Tin", author: "Lê Văn Cường", year: 2022, code: "CS401", type: "BÀI GIẢNG" },
        { id: 5, title: "Kiểm Thử Xâm Nhập", author: "Hồ Đắc Hưng", year: 2022, code: "CS402", type: "BÀI GIẢNG" },
        { id: 6, title: "Điện Tử Số", author: "Nguyễn Trung Hiếu", year: 2019, code: "EE101", type: "BÀI GIẢNG" },
        { id: 7, title: "Xử Lý Ảnh", author: "Nguyễn Quang Hoan", year: 2020, code: "CS301", type: "BÀI GIẢNG" },
        { id: 8, title: "Cấu Kiện Điện Tử", author: "Ths Trần Thị Cầm", year: 2019, code: "EE102", type: "BÀI GIẢNG" },
        { id: 9, title: "Cấu Trúc Dữ Liệu Và Giải Thuật", author: "Phan Thị Hà", year: 2020, code: "CS201", type: "BÀI GIẢNG" },
        { id: 10, title: "Giải Tích 2", author: "Vũ Gia Tê", year: 2020, code: "MATH102", type: "BÀI GIẢNG" },
        { id: 11, title: "Lập Trình Hướng Đối Tượng", author: "Nguyễn Mạnh Sơn", year: 2021, code: "CS102", type: "BÀI GIẢNG" },
        { id: 12, title: "Quản Lý Mạng Viễn Thông", author: "Nguyễn Tiến Ban", year: 2022, code: "TEL401", type: "BÀI GIẢNG" },
        { id: 13, title: "Kỹ Thuật Đồ Họa", author: "Trịnh Thị Vân Anh", year: 2021, code: "CS302", type: "BÀI GIẢNG" },
        { id: 14, title: "Trí Tuệ Nhân Tạo", author: "Từ Minh Phương", year: 2022, code: "CS403", type: "BÀI GIẢNG" },
        { id: 15, title: "Cấu Trúc Dữ Liệu Và Giải Thuật", author: "Nguyễn Văn A", year: 2020, code: "CS201", type: "BÀI GIẢNG" },
        { id: 16, title: "Lập Trình C++", author: "Trần Văn B", year: 2019, code: "CS103", type: "BÀI GIẢNG" },
        { id: 17, title: "Kỹ Thuật Chuyển Mạch 1", author: "Hoàng Trọng Minh, Nguyễn Thanh Trà", year: 2021, code: "TEL301", type: "BÀI GIẢNG" },
        { id: 18, title: "An Toàn Và Bảo Mật Hệ Thống Thông Tin", author: "Lê Phúc", year: 2022, code: "CS401", type: "BÀI GIẢNG" },
        { id: 19, title: "BÀI GIẢNG Trường Điện Từ Và Siêu Cao Tần", author: "Tôn Thất Bảo Đạt, Dương Hiển Thuận", year: 2021, code: "EE201", type: "BÀI GIẢNG" },
        { id: 20, title: "Kho Dữ Liệu Và Khai Phá Dữ Liệu", author: "Nguyễn Ngọc Duy", year: 2022, code: "CS404", type: "BÀI GIẢNG" },
        { id: 21, title: "Đường Lối Cách Mạng Của ĐCSVN", author: "Trần Thị Minh Tuyết", year: 2021, code: "POL101", type: "BÀI GIẢNG" },
        { id: 22, title: "Hệ Điều Hành", author: "Duynn", year: 2021, code: "CS104", type: "BÀI GIẢNG" },
        { id: 23, title: "Kiến Trúc Máy Tính", author: "Nguyễn Văn C", year: 2020, code: "CS105", type: "BÀI GIẢNG" },
        { id: 24, title: "E-Learning", author: "N/A", year: 2022, code: "GEN001", type: "BÀI GIẢNG" },
        { id: 25, title: "Cơ Sở Dữ Liệu Phân Tán", author: "TS Phạm Thế Quế", year: 2022, code: "CS406", type: "BÀI GIẢNG" },
        { id: 26, title: "Thiết Kế Game", author: "Hồ Đắc Hưng", year: 2022, code: "CS407", type: "BÀI GIẢNG" },
        { id: 27, title: "Ăngten Truyền Sóng", author: "Nguyễn Viết Minh", year: 2021, code: "EE304", type: "BÀI GIẢNG" },
        { id: 28, title: "Cấu Kiện Điện Tử", author: "Trần Thúy Hà", year: 2020, code: "EE102", type: "BÀI GIẢNG" },
        { id: 29, title: "Mạng Truy Nhập", author: "Lê Duy Khánh", year: 2022, code: "TEL305", type: "BÀI GIẢNG" },
        { id: 30, title: "Nhập Môn Công Nghệ Phần Mềm", author: "Trần Đình Quế", year: 2021, code: "CS106", type: "BÀI GIẢNG" },
        { id: 31, title: "Điện Tử Số", author: "Trần Thị Thúy Hà", year: 2019, code: "EE101", type: "BÀI GIẢNG" },
        { id: 32, title: "Trí Tuệ Nhân Tạo", author: "Nguyễn Quang Hoan", year: 2022, code: "CS403", type: "BÀI GIẢNG" },
        { id: 33, title: "Mạng Máy Tính", author: "TS Phạm Thế Quế", year: 2021, code: "CS203", type: "BÀI GIẢNG" },
        { id: 34, title: "Lập Trình C++", author: "Nguyễn Mạnh Hùng", year: 2020, code: "CS103", type: "BÀI GIẢNG, BÀI TẬP, THỰC HÀNH" },
        { id: 35, title: "Xử Lý Tín Hiệu Số", author: "PGS.TS Đặng Hoài Bắc", year: 2022, code: "EE305", type: "BÀI GIẢNG" },
        { id: 36, title: "Điện Tử Tương Tự", author: "Lê Xuân Thành", year: 2020, code: "EE202", type: "BÀI GIẢNG" },
        { id: 37, title: "Toán Cao Cấp A2", author: "Lê Bá Long", year: 2019, code: "MATH104", type: "BÀI GIẢNG" },
        { id: 38, title: "Kỹ Thuật Điện Tử", author: "Ngô Đức Thiện", year: 2020, code: "EE103", type: "BÀI GIẢNG" },
        { id: 39, title: "Kỹ Thuật Lập Trình", author: "Nguyễn Duy Phương", year: 2020, code: "CS107", type: "BÀI GIẢNG" },
        { id: 40, title: "Phân Tích Thiết Kế Hệ Thống Thông Tin", author: "Nguyễn Anh Hào", year: 2021, code: "CS305", type: "BÀI GIẢNG, BÀI TẬP, THỰC HÀNH" },
        { id: 41, title: "Xác Suất Thống Kê", author: "Lê Bá Long", year: 2020, code: "MATH201", type: "BÀI GIẢNG" },
        { id: 42, title: "Tiếng Anh Chuyên Ngành CNTT", author: "Lê Thị Hồng Hạnh", year: 2022, code: "ENG301", type: "BÀI GIẢNG" },
        { id: 43, title: "Mạng Máy Tính", author: "Nguyễn Thị Phương Dung", year: 2021, code: "CS203", type: "BÀI GIẢNG" },
        { id: 44, title: "Cấu Trúc Rời Rạc", author: "Đặng Văn Đức", year: 2020, code: "CS201", type: "BÀI GIẢNG" },
        { id: 45, title: "Kỹ Thuật Truyền Số Liệu", author: "Nguyễn Ngọc Anh", year: 2021, code: "TEL306", type: "BÀI GIẢNG" },
        { id: 46, title: "Nhập Môn Trí Tuệ Nhân Tạo", author: "Nguyễn Thị Phương Dung", year: 2022, code: "CS403", type: "BÀI GIẢNG" },
        { id: 47, title: "Thiết Kế Vi Mạch Số", author: "Nguyễn Trường Giang", year: 2021, code: "EE403", type: "BÀI GIẢNG" },
        { id: 48, title: "Thiết Kế Giao Diện Người Dùng", author: "Lê Bá Long", year: 2021, code: "CS404", type: "BÀI GIẢNG" },
        { id: 49, title: "Hệ Cơ Sở Dữ Liệu", author: "Nguyễn Văn A", year: 2022, code: "CS204", type: "BÀI GIẢNG" },
        { id: 50, title: "Lập Trình CSDL", author: "Nguyễn Văn B", year: 2020, code: "CS301", type: "BÀI GIẢNG" },
        { id: 51, title: "Lập Trình Python", author: "Nguyễn Duy Phương", year: 2021, code: "CS108", type: "BÀI GIẢNG, BÀI TẬP, THỰC HÀNH" },
        { id: 52, title: "Cấu Trúc Máy Tính", author: "Nguyễn Văn C", year: 2020, code: "CS105", type: "BÀI GIẢNG" },
        { id: 53, title: "Kỹ Thuật Lập Trình", author: "Nguyễn Văn D", year: 2020, code: "CS107", type: "BÀI GIẢNG" },
        { id: 54, title: "Lập Trình Cơ Bản", author: "Nguyễn Văn E", year: 2021, code: "CS102", type: "BÀI GIẢNG" },
        { id: 55, title: "Kỹ Năng Mềm", author: "N/A", year: 2022, code: "GEN002", type: "BÀI GIẢNG" },
        { id: 56, title: "Đạo Đức Nghề Nghiệp", author: "N/A", year: 2022, code: "GEN003", type: "BÀI GIẢNG" },
        { id: 57, title: "Toán Rời Rạc", author: "Nguyễn Văn F", year: 2021, code: "CS202", type: "BÀI GIẢNG" },
        { id: 58, title: "Mạng Truyền Thông", author: "Nguyễn Văn G", year: 2022, code: "TEL204", type: "BÀI GIẢNG" },
        { id: 59, title: "Công Nghệ Phần Mềm", author: "Nguyễn Văn H", year: 2021, code: "CS401", type: "BÀI GIẢNG" },
        { id: 60, title: "Điều Khiển Tự Động", author: "Nguyễn Văn I", year: 2021, code: "EE402", type: "BÀI GIẢNG" },
        { id: 61, title: "Kỹ Thuật Xung Số", author: "Nguyễn Văn J", year: 2020, code: "EE203", type: "BÀI GIẢNG" },
        { id: 62, title: "Giải Tích Mạch", author: "Nguyễn Văn K", year: 2020, code: "EE201", type: "BÀI GIẢNG" },
        { id: 63, title: "Phát Triển Ứng Dụng Web", author: "Nguyễn Văn L", year: 2022, code: "CS406", type: "BÀI GIẢNG" },
        { id: 64, title: "Thiết Kế Mạng", author: "Nguyễn Văn M", year: 2022, code: "CS408", type: "BÀI GIẢNG" }, 
        // Add more documents here to reach ~300 documents (15 per page × 20 pages)
    ];

    // DOM Elements
    const searchField = document.getElementById('search-field');
    const searchKeyword = document.getElementById('search-keyword');
    const searchButton = document.getElementById('search-button');
    const authorFilter = document.getElementById('author-filter');
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const documentsGrid = document.getElementById('books-grid');
    const selectedDocsPreview = document.getElementById('selected-books-preview');
    const borrowingForm = document.getElementById('borrowing-form');
    const formDocsTable = document.getElementById('form-books-table').getElementsByTagName('tbody')[0];
    const formTotalDocs = document.getElementById('form-total-books');
    const printFormBtn = document.getElementById('print-form-btn');
    const saveFormBtn = document.getElementById('save-form-btn');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    documentsGrid.parentNode.insertBefore(paginationContainer, documentsGrid.nextSibling);
    
    // Form input fields
    const inputName = document.getElementById('input-name');
    const inputStudentId = document.getElementById('input-student-id');
    const inputClass = document.getElementById('input-class');
    const inputEmail = document.getElementById('input-email');
    
    // Selected documents array
    let selectedDocuments = [];
    
    // Pagination variables
    const itemsPerPage = 6;
    let currentPage = 1;
    let totalPages = 1;
    
    // Animation variables
    let searchTimeout = null;
    const animationDuration = 300;
    
    // Initialize the page
    function init() {
        // Set current date
        const today = new Date();
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + 14); // 2 weeks from today
        
        document.getElementById('form-register-date').textContent = formatDate(today);
        document.getElementById('form-register-date2').textContent = formatDate(today);
        document.getElementById('form-due-date').textContent = formatDate(dueDate);
        
        // Generate random register number
        document.getElementById('form-register-number').textContent = `#${Math.floor(100000 + Math.random() * 900000)}`;
        
        // Populate filters
        populateFilters();
        
        // Display documents with pagination
        displayDocumentsWithPagination();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Format date as dd/mm/yyyy
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Populate all filter dropdowns
    function populateFilters() {
        // Populate author filter
        const authors = [...new Set(documents.map(doc => doc.author).filter(author => author))];
        authors.sort();
        populateDropdown(authorFilter, authors, "Tất cả tác giả");
        
        // Populate year filter
        const years = [...new Set(documents.map(doc => doc.year))];
        years.sort((a, b) => b - a); // Sort descending (newest first)
        populateDropdown(yearFilter, years, "Tất cả năm");
        
        // Populate type filter (already has options in HTML)
        
        // Populate availability filter (already has options in HTML)
    }
    
    // Helper function to populate a dropdown
    function populateDropdown(selectElement, options, defaultText) {
        selectElement.innerHTML = `<option value="all">${defaultText}</option>`;
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }
    
    // Display documents with pagination
    function displayDocumentsWithPagination() {
        // Filter documents first
        const filteredDocs = filterDocuments();
        
        // Calculate total pages
        totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
        
        // Ensure current page is valid
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }
        
        // Get documents for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const docsToDisplay = filteredDocs.slice(startIndex, endIndex);
        
        // Display documents with animation
        displayDocumentsWithAnimation(docsToDisplay);
        
        // Display pagination
        displayPagination(filteredDocs.length);
    }
    
    // Display documents with fade animation
    function displayDocumentsWithAnimation(docsToDisplay) {
        // Start fade out
        documentsGrid.style.opacity = '0';
        
        // After fade out completes, update content and fade in
        setTimeout(() => {
            displayDocuments(docsToDisplay);
            documentsGrid.style.opacity = '1';
        }, animationDuration);
    }
    
    // Filter documents based on search criteria
    function filterDocuments() {
        const searchFieldValue = searchField.value;
        const searchTerm = searchKeyword.value.toLowerCase();
        const author = authorFilter.value;
        const year = yearFilter.value;
        const type = typeFilter.value;
        const availability = availabilityFilter.value;
        
        return documents.filter(doc => {
            // Search field matching
            let matchesSearch = false;
            if (searchTerm) {
                switch(searchFieldValue) {
                    case 'title':
                        matchesSearch = doc.title.toLowerCase().includes(searchTerm);
                        break;
                    case 'author':
                        matchesSearch = doc.author && doc.author.toLowerCase().includes(searchTerm);
                        break;
                    case 'publisher':
                        // Add if you have publisher field
                        break;
                    case 'year':
                        matchesSearch = doc.year.toString().includes(searchTerm);
                        break;
                    case 'classification':
                        matchesSearch = doc.code && doc.code.toLowerCase().includes(searchTerm);
                        break;
                    case 'isbn':
                        // Add if you have ISBN field
                        break;
                    default:
                        matchesSearch = doc.title.toLowerCase().includes(searchTerm) || 
                                       (doc.author && doc.author.toLowerCase().includes(searchTerm));
                }
            } else {
                matchesSearch = true; // No search term means match all
            }
            
            // Filter matching
            const matchesAuthor = author === 'all' || (doc.author && doc.author === author);
            const matchesYear = year === 'all' || doc.year.toString() === year;
            const matchesType = type === 'all' || doc.type === type;
            const matchesAvailability = availability === 'all' || 
                                       (availability === 'available' && Math.random() > 0.3); // Simulate availability
            
            return matchesSearch && matchesAuthor && matchesYear && matchesType && matchesAvailability;
        });
    }
    
    // Display documents in a grid layout
function displayDocuments(docsToDisplay) {
    documentsGrid.innerHTML = '';
    
    if (docsToDisplay.length === 0) {
        documentsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book-open"></i>
                <h3>Không tìm thấy tài liệu phù hợp</h3>
                <p>Hãy thử thay đổi tiêu chí tìm kiếm của bạn</p>
            </div>
        `;
        return;
    }
    
    docsToDisplay.forEach(doc => {
        const docCard = document.createElement('div');
        docCard.className = 'book-card';
        if (selectedDocuments.some(d => d.id === doc.id)) {
            docCard.classList.add('selected');
        }
        
        docCard.innerHTML = `
            <div class="book-cover">${doc.type}</div>
            <div class="book-info">
                <h3 class="book-title">${doc.title}</h3>
                <div class="book-meta">
                    <span class="book-author"><i class="fas fa-user"></i> ${doc.author || 'Không rõ'}</span>
                    <span class="book-year"><i class="fas fa-calendar-alt"></i> ${doc.year}</span>
                    <span class="book-code"><i class="fas fa-barcode"></i> ${doc.code}</span>
                </div>
            </div>
            <div class="book-actions">
                <button class="select-btn" data-id="${doc.id}">
                    ${selectedDocuments.some(d => d.id === doc.id) ? 
                      '<i class="fas fa-minus-circle"></i> Bỏ chọn' : 
                      '<i class="fas fa-plus-circle"></i> Chọn'}
                </button>
            </div>
        `;
        
        documentsGrid.appendChild(docCard);
    });
}
    
    // Display pagination controls
    function displayPagination(totalItems) {
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-btn';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayDocumentsWithPagination();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(prevButton);
        
        // Page numbers - show limited set around current page
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust if we're at the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // First page and ellipsis if needed
        if (startPage > 1) {
            const firstPageBtn = createPageButton(1);
            paginationContainer.appendChild(firstPageBtn);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
        }
        
        // Visible page range
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createPageButton(i);
            paginationContainer.appendChild(pageBtn);
        }
        
        // Last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
            
            const lastPageBtn = createPageButton(totalPages);
            paginationContainer.appendChild(lastPageBtn);
        }
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-btn';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayDocumentsWithPagination();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(nextButton);
    }
    
    // Helper to create a page button
    function createPageButton(pageNumber) {
        const pageButton = document.createElement('button');
        pageButton.className = 'pagination-btn';
        pageButton.textContent = pageNumber;
        if (pageNumber === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = pageNumber;
            displayDocumentsWithPagination();
            scrollToTop();
        });
        return pageButton;
    }
    
    // Scroll to top of documents
    function scrollToTop() {
        window.scrollTo({
            top: documentsGrid.offsetTop - 20,
            behavior: 'smooth'
        });
    }
    
    // Update selected documents preview
    function updateSelectedDocumentsPreview() {
        selectedDocsPreview.innerHTML = '';
        
        if (selectedDocuments.length === 0) {
            borrowingForm.style.display = 'none';
            return;
        }
        
        borrowingForm.style.display = 'block';
        
        // Create horizontal scroll container
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'selected-books-scroll';
        
        selectedDocuments.forEach((doc, index) => {
            const selectedDoc = document.createElement('div');
            selectedDoc.className = 'selected-book';
            selectedDoc.innerHTML = `
                <button class="remove-selected" data-id="${doc.id}" title="Bỏ chọn">
                    <i class="fas fa-times"></i>
                </button>
                <div class="selected-book-title">${doc.title}</div>
                <div class="selected-book-meta">
                    <span>${doc.author || 'Không rõ'}</span>
                    <span>${doc.code}</span>
                </div>
            `;
            scrollContainer.appendChild(selectedDoc);
        });
        
        selectedDocsPreview.appendChild(scrollContainer);
        updateBorrowingForm();
    }
    
    // Update borrowing form with selected documents
    function updateBorrowingForm() {
        // Clear existing rows
        formDocsTable.innerHTML = '';
        
        // Add header row
        const headerRow = formDocsTable.insertRow();
        headerRow.innerHTML = `
            <th>STT</th>
            <th>Tên tài liệu</th>
            <th>Tác giả</th>
            <th>Mã tài liệu</th>
        `;
        
        // Add selected documents to the table
        selectedDocuments.forEach((doc, index) => {
            const row = formDocsTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${doc.title}</td>
                <td>${doc.author || 'Không rõ'}</td>
                <td>${doc.code || ''}</td>
            `;
        });
        
        // Update total documents count
        formTotalDocs.textContent = selectedDocuments.length;
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Search field events with debounce
        searchKeyword.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1; // Reset to first page when searching
                displayDocumentsWithPagination();
            }, 300);
        });
        
        searchButton.addEventListener('click', function() {
            currentPage = 1;
            displayDocumentsWithPagination();
        });
        
        // Filter change events
        authorFilter.addEventListener('change', function() {
            currentPage = 1;
            displayDocumentsWithPagination();
        });
        
        yearFilter.addEventListener('change', function() {
            currentPage = 1;
            displayDocumentsWithPagination();
        });
        
        typeFilter.addEventListener('change', function() {
            currentPage = 1;
            displayDocumentsWithPagination();
        });
        
        availabilityFilter.addEventListener('change', function() {
            currentPage = 1;
            displayDocumentsWithPagination();
        });
        
        // Document selection (delegated event)
        documentsGrid.addEventListener('click', function(e) {
            const selectBtn = e.target.closest('.select-btn');
            if (selectBtn) {
                const docId = parseInt(selectBtn.getAttribute('data-id'));
                toggleDocumentSelection(docId);
            }
        });
        
        // Remove selected document (delegated event)
        selectedDocsPreview.addEventListener('click', function(e) {
            const removeBtn = e.target.closest('.remove-selected');
            if (removeBtn) {
                const docId = parseInt(removeBtn.getAttribute('data-id'));
                removeSelectedDocument(docId);
            }
        });
        
        // Form actions
        printFormBtn.addEventListener('click', printForm);
        saveFormBtn.addEventListener('click', saveAsPDF);
        clearFormBtn.addEventListener('click', clearForm);
    }
    
    // Toggle document selection
    function toggleDocumentSelection(docId) {
        const docIndex = selectedDocuments.findIndex(d => d.id === docId);
        
        if (docIndex === -1) {
            // Add to selected (limit to 10 documents)
            if (selectedDocuments.length >= 5) {
                alert('Bạn chỉ có thể mượn tối đa 5 tài liệu mỗi lần.');
                return;
            }
            
            const docToAdd = documents.find(d => d.id === docId);
            if (docToAdd) {
                selectedDocuments.push(docToAdd);
            }
        } else {
            // Remove from selected
            selectedDocuments.splice(docIndex, 1);
        }
        
        displayDocumentsWithPagination();
        updateSelectedDocumentsPreview();
    }
    
    // Remove selected document
    function removeSelectedDocument(docId) {
        selectedDocuments = selectedDocuments.filter(d => d.id !== docId);
        displayDocumentsWithPagination();
        updateSelectedDocumentsPreview();
    }
    
    function printForm() {
        if (!validateForm()) return;
        
        // Lưu trữ trạng thái ban đầu
        const formActions = document.querySelector('.form-actions');
        const originalDisplay = formActions.style.display;
        const originalBodyOverflow = document.body.style.overflow;
        
        // Ẩn các phần tử không cần in
        formActions.style.display = 'none';
        document.body.style.overflow = 'visible'; // Đảm bảo hiển thị đầy đủ nội dung
        
        // Tạo style in ấn tạm thời
        const style = document.createElement('style');
        style.id = 'temp-print-style';
        style.innerHTML = `
            @media print {
                body * {
                    visibility: hidden;
                }
                #borrowing-form, 
                #borrowing-form * {
                    visibility: visible;
                }
                #borrowing-form {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    border: none;
                    box-shadow: none;
                }
                @page {
                    size: auto;
                    margin: 10mm;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Kích hoạt chức năng in
        window.print();
        
        // Khôi phục trạng thái ban đầu
        setTimeout(() => {
            document.head.removeChild(style);
            formActions.style.display = originalDisplay;
            document.body.style.overflow = originalBodyOverflow;
        }, 1000); // Thời gian đủ để hoàn tất quá trình in
    }
    
    // Save form as PDF
    function saveAsPDF() {
        if (!validateForm()) return;
        
        // Hide buttons before capturing
        const formActions = document.querySelector('.form-actions');
        formActions.style.display = 'none';
        
        // Using html2canvas and jsPDF
        const { jsPDF } = window.jspdf;
        
        html2canvas(borrowingForm, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save(`PTIT_Phiếu_Mượn_${inputStudentId.value}.pdf`);
            
            // Show buttons again
            formActions.style.display = 'flex';
        });
    }
    
    // Clear form
    function clearForm() {
        if (selectedDocuments.length > 0 || 
            inputName.value || 
            inputStudentId.value || 
            inputClass.value || 
            inputEmail.value) {
            if (confirm('Bạn có chắc chắn muốn xóa toàn bộ thông tin đã nhập?')) {
                selectedDocuments = [];
                inputName.value = '';
                inputStudentId.value = '';
                inputClass.value = '';
                inputEmail.value = '';
                
                displayDocumentsWithPagination();
                updateSelectedDocumentsPreview();
            }
        }
    }
    
    // Validate form before printing/saving
    function validateForm() {
        if (selectedDocuments.length === 0) {
            alert('Vui lòng chọn ít nhất một tài liệu.');
            return false;
        }
        
        if (!inputName.value.trim()) {
            alert('Vui lòng nhập họ tên.');
            inputName.focus();
            return false;
        }
        
        if (!inputStudentId.value.trim()) {
            alert('Vui lòng nhập mã sinh viên.');
            inputStudentId.focus();
            return false;
        }
        
        if (!inputClass.value.trim()) {
            alert('Vui lòng nhập lớp.');
            inputClass.focus();
            return false;
        }
        
        const email = inputEmail.value.trim();
        if (!email || !/^[^\s@]+@(gmail\.com|stu\.ptit\.edu\.vn)$/.test(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ (@gmail.com hoặc @stu.ptit.edu.vn).');
            inputEmail.focus();
            return false;
        }
        
        
        return true;
    }
    
    // Initialize the application
    init();
});