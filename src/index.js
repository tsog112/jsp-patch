import React from 'react';

const GradeTable = () => {
  const subjects = [
    { 이수: '교양', 필수: '선택', 과목명: '자기소개서 작성', 학점: 1, 출석: 0, 과제: 0, 중간고사: 0, 기말고사: 0 },
    { 이수: '교양', 필수: '선택', 과목명: '영어', 학점: 2, 출석: 20, 과제: 10, 중간고사: 22, 기말고사: 13 },
    { 이수: '전공', 필수: '필수', 과목명: '서버프로그래밍', 학점: 3, 출석: 15, 과제: 18, 중간고사: 25, 기말고사: 26 },
    { 이수: '전공', 필수: '선택', 과목명: '소프트웨어공학', 학점: 3, 출석: 20, 과제: 20, 중간고사: 30, 기말고사: 30 },
  ];

  const calculateSubjectResults = (subject) => {
    const { 출석, 과제, 중간고사, 기말고사 } = subject;
    const total = 출석 + 과제 + 중간고사 + 기말고사;
    const average = total / 4;
    let grade;

    if (average >= 90) {
      grade = 'A+';
    } else if (average >= 80) {
      grade = 'B0';
    } else if (average >= 70) {
      grade = 'C+';
    } else if (average >= 60) {
      grade = 'D0';
    } else {
      grade = 'F';
    }

    return { total, average, grade };
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>이수</th>
            <th>필수</th>
            <th>과목명</th>
            <th>학점</th>
            <th>출석점수</th>
            <th>과제점수</th>
            <th>중간고사</th>
            <th>기말고사</th>
            <th>총점</th>
            <th>평균</th>
            <th>성적</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.이수}</td>
              <td>{subject.필수}</td>
              <td>{subject.과목명}</td>
              <td>{subject.학점}</td>
              <td>{subject.출석}</td>
              <td>{subject.과제}</td>
              <td>{subject.중간고사}</td>
              <td>{subject.기말고사}</td>
              <td>{calculateSubjectResults(subject).total}</td>
              <td>{calculateSubjectResults(subject).average.toFixed(2)}</td>
              <td>{calculateSubjectResults(subject).grade}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">합계</td>
            <td>8</td>
            <td>55</td>
            <td>48</td>
            <td>77</td>
            <td>69</td>
            <td>249</td>
            <td>83</td>
            <td>B0</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Grade Table</h1>
      <GradeTable />
    </div>
  );
}

export default App;
