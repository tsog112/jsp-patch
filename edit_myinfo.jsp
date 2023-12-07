<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<!-- Created By CodingNepal -->
<html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <title>Login Form Design | CodeLab</title>
      <link rel="stylesheet" href="./css/edit_myinfo.css">
   </head>
   <body>
      <div class="wrapper">
         <a href="./index.jsp">
            <div class="title">
               PA+CH
            </div>
            </a>
         <form action="#">
            <div class="field">
                <label>사용자님 정보를 수정하시겠습니까?</label>
             </div>
            <div class="field">
               <input type="text" required>
               <label>이름</label>
            </div>
            <div class="field">
               <input type="password" required>
               <label>비밀번호</label>
            </div>
            <div class="field">
                <input type="password" required>
                <label>비밀번호 확인</label>
             </div>
            <br><br>
            <div class="field">
               <input type="submit" value="수정하기">
            </div>
         </form>
      </div>
   </body>
</html>