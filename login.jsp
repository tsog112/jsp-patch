<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<!-- Created By CodingNepal -->
<html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <title>Login Form Design | CodeLab</title>
      <link rel="stylesheet" href="./css/login.css">
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
               <label>이메일</label>
            </div>
            <div class="field">
               <input type="password" required>
               <label>비밀번호</label>
            </div>
            <br><br>
            <div class="field">
               <input type="submit" value="로그인">
            </div>
            <div class="signup-link">
                가입하신 계정이 없으신가요? <a href="./signup.jsp">가입하기</a>
            </div>
         </form>
      </div>
   </body>
</html>