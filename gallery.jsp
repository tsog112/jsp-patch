<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<!-- Coding By CodingNepal - www.codingnepalweb.com -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery</title>
  <link rel="stylesheet" href="./css/gallery.css">
</head>
<body>
    <header>
      <nav class="navbar">
        <a href="./index.jsp" class="logo">
          PA+CH
        </a>
        <ul class="menu-links">
          <li><a href="./upload.jsp">사진 업로드</a></li>
          <li><a href="./gallery.jsp">갤러리</a></li>
          <li><a href="./edit_myinfo.jsp">내 정보 수정</a></li>
          <li class="join-btn"><a href="./index.jsp">로그아웃</a></li>
        </ul>
      </nav>
    </header>



    <h3>내 갤러리</h3>
    
    <!-- New Categories will be displayed here -->
    <div id="categories-container"></div>

    <form action="#" class="search-form">
      <input type="text" placeholder="검색하세요!" required>
      <button class="material-symbols-outlined" type="submit"><img src="./img/search.png" height="50%" weight="50%"></button>
    </form><br>
    <div class="masonry">
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Image description">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목 수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목 수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목 수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목 수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
      <div class="grid-item">
        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ">
        <p class="image-title">Image Title</p>
        <div class="actions hidden">
          <button class="delete-btn">삭제</button>
          <button class="edit-btn">제목 수정</button>
          <a href="path_to_image" download="Image Title">다운로드</a>
        </div>
      </div>
    </div>
    
      
      
    
<script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.grid-item').forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('click', function() {
          const actions = this.nextElementSibling;
          // Toggle visibility of the actions
          actions.style.display = actions.style.display === 'block' ? 'none' : 'block';
        });
      });
    
      // Handle delete
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          this.closest('.grid-item').remove();
        });
      });
    
      // Handle edit
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
          const title = this.closest('.grid-item').querySelector('.image-title');
          const currentText = title.innerText;
          const newTitle = prompt('Enter new title', currentText);
          if (newTitle) title.innerText = newTitle;
        });
      });
    });

    </script>
    
      
        
</body>
</html>