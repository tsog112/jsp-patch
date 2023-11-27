<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Created By CodingNepal -->
<html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <title>Login Form Design | CodeLab</title>
      <link rel="stylesheet" href="./css/signup.css">
   </head>
   <body>
      <div class="wrapper">
         <a href="./index.jsp">
            <div class="title">
               PA+CH
            </div>
            </a>
         <br>
         <form action="#">
            <div class="field">
               <input type="text" required>
               <label>이름</label>
            </div>
            <div class="field">
                <input type="text" required>
                <label>아이디</label>
             </div>
            <div class="field">
                <input type="email" required>
                <label>이메일</label>
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
               <input type="submit" value="가입하기">
            </div>
         </form>
      </div>
   </body>
</html>