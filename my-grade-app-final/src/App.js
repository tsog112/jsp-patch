import React, { useState } from "react";
import "./App.css";
import dataYear1 from "./mock-data.json";
import dataYear2 from "./mock-data-second.json"; 
import dataYear3 from "./mock-data-third.json";
import GradeTable from "./GradeTable";

const getGrade = (score, credit) => {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A0';
  if (score >= 85) return 'B+';
  if (score >= 80) return 'B0';
  if (score >= 75) return 'C+';
  if (score >= 70) return 'C0';
  if (score >= 65) return 'D+';
  if (score >= 60) return 'D0';
  return 'F'; // Assuming score is always >= 0
};
const sortGrades = (grades) => {
  return grades.sort((a, b) => {
    if (a.이수 !== b.이수) {
      return a.이수.localeCompare(b.이수);
    }
    if (a.필수 !== b.필수) {
      return a.필수.localeCompare(b.필수);
    }
    return a.과목명.localeCompare(b.과목명);
  });
};

const calculateGrade = (grade) => {
  const totalScore = Number(grade.학점) === 1 ? 0 :
    Number(grade.출석점수) + Number(grade.과제점수) + Number(grade.중간고사) + Number(grade.기말고사);
  return {
    ...grade,
    총점: totalScore,
    성적: grade.학점 === "1" ? grade.성적 : getGrade(totalScore, Number(grade.학점))
  };
};

const App = () => {
  const initialNewGradeState = {
    이수: '',
    필수: '',
    과목명: '',
    학점: '',
    출석점수: '',
    과제점수: '',
    중간고사: '',
    기말고사: ''
  };
// table 1
  const [gradesYear1, setGradesYear1] = useState(sortGrades(dataYear1.map(grade => calculateGrade(grade))));
  const [isAddingYear1, setIsAddingYear1] = useState(false);
  const [selectedRowIndexYear1, setSelectedRowIndexYear1] = useState(null);
  const [newGradeYear1, setNewGradeYear1] = useState(initialNewGradeState);

  const addGradeYear1 = () => {
    setIsAddingYear1(true);
    setNewGradeYear1(initialNewGradeState);
  };

  const saveGradeYear1 = () => {
    if (isAddingYear1) {
      if (gradesYear1.some(grade => grade.과목명 === newGradeYear1.과목명)) {
        alert('동일한 과목명이 이미 존재합니다.');
        return;  
    }

    // Calculate total score with validation
    const totalScore = Number(newGradeYear1.출석점수) + Number(newGradeYear1.과제점수) +
                       Number(newGradeYear1.중간고사) + Number(newGradeYear1.기말고사);

    // Validate total score
    if (totalScore < 0 || totalScore > 100) {
      alert('과목별 총점은 0보다 작거나 100보다 클 수 없습니다.');
      return; // Exit without saving
    }
  
    setGradesYear1((currentGrades) => {
      let gradeWithTotal;
  
      if (newGradeYear1.학점 === "1") {
        // Directly use the selected 'P' or 'NP' for 1-credit courses
        gradeWithTotal = {
          ...newGradeYear1,
          총점: 0, // No total score needed for 1-credit courses
          성적: newGradeYear1.성적 // Directly use the selected grade
        };
      } else {
        // Calculate total score for courses with more than 1 credit
        const totalScore = Number(newGradeYear1.출석점수) + Number(newGradeYear1.과제점수) +
                           Number(newGradeYear1.중간고사) + Number(newGradeYear1.기말고사);
  
        gradeWithTotal = {
          ...newGradeYear1,
          총점: totalScore,
          성적: getGrade(totalScore, Number(newGradeYear1.학점))
        };
      }
  
      const sortedGrades = sortGrades([...currentGrades, gradeWithTotal]);
      return sortedGrades;
    });
      

      setIsAddingYear1(false);
      setNewGradeYear1({});
    }
  };

  const deleteGradeYear1 = () => {
    if (selectedRowIndexYear1 != null) {
      const updatedGrades = gradesYear1.filter((_, index) => index !== selectedRowIndexYear1);
      setGradesYear1(updatedGrades);
      setSelectedRowIndexYear1(null);
    }
  };

  const handleInputChangeYear1 = (event, field) => {
    let updatedValue = event.target.value;
    let numberValue = Number(updatedValue);
    if (field === '출석점수' || field === '과제점수') {
        if (numberValue < 0 || numberValue > 20) {
            alert('출석 및 과제 점수는 0보다 작거나 20보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    } else if (field === '중간고사' || field === '기말고사') {
        if (numberValue < 0 || numberValue > 30) {
            alert('중간 및 기말 점수는 0보다 작거나 30보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    }

    if (field === '중간고사' || field === '기말고사') {
        updatedValue = Math.max(0, Math.min(30, numberValue)); // Clamp values between 0 and 30
    }

    if (field === '성적' && newGradeYear1.학점 === "1") {
      setNewGradeYear1((prevGrade) => ({
          ...prevGrade,
          성적: event.target.value  // Make sure this line correctly updates the state
      }));
      return;
  }

    setNewGradeYear1((prevGrade) => {
        const updatedGrade = { ...prevGrade, [field]: updatedValue };
        
        // Calculate the total score for all courses
        const totalScore = Number(updatedGrade.출석점수) + Number(updatedGrade.과제점수) +
                           Number(updatedGrade.중간고사) + Number(updatedGrade.기말고사);

        // Assign P or NP for 1-credit courses, or calculate letter grade for others
        updatedGrade.성적 = updatedGrade.학점 === "1"
            ? (totalScore >= 60 ? 'P' : 'NP')
            : getGrade(totalScore, Number(updatedGrade.학점));

        // Keep 총점 0 for 1-credit courses to prevent affecting GPA
        updatedGrade.총점 = updatedGrade.학점 === "1" ? 0 : totalScore;

        return updatedGrade;
    });
};


  const totalsYear1 = gradesYear1.reduce((acc, curr) => {
    if (curr.성적 !== 'P') { // Adjust as needed for 'NP' or other non-numeric grades
      acc.총점 += Number(curr.총점);
      acc.출석점수 += Number(curr.출석점수);
      acc.과제점수 += Number(curr.과제점수);
      acc.중간고사 += Number(curr.중간고사);
      acc.기말고사 += Number(curr.기말고사);
      acc.학점 += Number(curr.학점);
    }
    return acc;
  }, { 학점: 0,출석점수:0,과제점수:0, 중간고사:0,기말고사:0,총점: 0});

  const calculateAverageYear1 = () => {
    const validGrades = gradesYear1.filter(grade => Number(grade.학점) !== 1);
    const totalScore = validGrades.reduce((acc, curr) => acc + curr.총점, 0);
    return validGrades.length > 0 ? (totalScore / validGrades.length).toFixed(0) : 'N/A';
  };
  
  const averageScoreYear1 = calculateAverageYear1();
  const averageGradeYear1 = getGrade(averageScoreYear1, 0); // Using normal grading for average

// table 2
  const [gradesYear2, setGradesYear2] = useState(sortGrades(dataYear2.map(grade => calculateGrade(grade))));
  const [isAddingYear2, setIsAddingYear2] = useState(false);
  const [selectedRowIndexYear2, setSelectedRowIndexYear2] = useState(null);
  const [newGradeYear2, setNewGradeYear2] = useState(initialNewGradeState);
  const addGradeYear2 = () => {
    setIsAddingYear2(true);
    setNewGradeYear2(initialNewGradeState);
  };

  const saveGradeYear2 = () => {
    if (isAddingYear2) {
      if (gradesYear2.some(grade => grade.과목명 === newGradeYear2.과목명)) {
        alert('동일한 과목명이 이미 존재합니다.');
        return;  
    }

    // Calculate total score with validation
    const totalScore = Number(newGradeYear2.출석점수) + Number(newGradeYear2.과제점수) +
                       Number(newGradeYear2.중간고사) + Number(newGradeYear2.기말고사);

    // Validate total score
    if (totalScore < 0 || totalScore > 100) {
      alert('과목별 총점은 0보다 작거나 100보다 클 수 없습니다.');
      return; // Exit without saving
    }
  
    setGradesYear2((currentGrades) => {
      let gradeWithTotal;
  
      if (newGradeYear2.학점 === "1") {
        // Directly use the selected 'P' or 'NP' for 1-credit courses
        gradeWithTotal = {
          ...newGradeYear2,
          총점: 0, // No total score needed for 1-credit courses
          성적: newGradeYear2.성적 // Directly use the selected grade
        };
      } else {
        // Calculate total score for courses with more than 1 credit
        const totalScore = Number(newGradeYear2.출석점수) + Number(newGradeYear2.과제점수) +
                           Number(newGradeYear2.중간고사) + Number(newGradeYear2.기말고사);
  
        gradeWithTotal = {
          ...newGradeYear2,
          총점: totalScore,
          성적: getGrade(totalScore, Number(newGradeYear2.학점))
        };
      }
  
      const sortedGrades = sortGrades([...currentGrades, gradeWithTotal]);
      return sortedGrades;
    });
  
      

      setIsAddingYear2(false);
      setNewGradeYear2({});
    }
  };

  const deleteGradeYear2 = () => {
    if (selectedRowIndexYear2 != null) {
      const updatedGrades = gradesYear2.filter((_, index) => index !== selectedRowIndexYear2);
      setGradesYear2(updatedGrades);
      setSelectedRowIndexYear2(null);
    }
  };

  const handleInputChangeYear2 = (event, field) => {
    let updatedValue = event.target.value;
    let numberValue = Number(updatedValue);
    if (field === '출석점수' || field === '과제점수') {
        if (numberValue < 0 || numberValue > 20) {
            alert('출석 및 과제 점수는 0보다 작거나 20보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    } else if (field === '중간고사' || field === '기말고사') {
        if (numberValue < 0 || numberValue > 30) {
            alert('중간 및 기말 점수는 0보다 작거나 30보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    }

    if (field === '중간고사' || field === '기말고사') {
        updatedValue = Math.max(0, Math.min(30, numberValue)); // Clamp values between 0 and 30
    }

    if (field === '성적' && newGradeYear2.학점 === "1") {
      setNewGradeYear2((prevGrade) => ({
          ...prevGrade,
          성적: event.target.value  // Make sure this line correctly updates the state
      }));
      return;
  }

    setNewGradeYear2((prevGrade) => {
        const updatedGrade = { ...prevGrade, [field]: updatedValue };

        // Calculate the total score for all courses
        const totalScore = Number(updatedGrade.출석점수) + Number(updatedGrade.과제점수) +
                           Number(updatedGrade.중간고사) + Number(updatedGrade.기말고사);

        // Assign P or NP for 1-credit courses, or calculate letter grade for others
        updatedGrade.성적 = updatedGrade.학점 === "1"
            ? (totalScore >= 60 ? 'P' : 'NP')
            : getGrade(totalScore, Number(updatedGrade.학점));

        // Keep 총점 0 for 1-credit courses to prevent affecting GPA
        updatedGrade.총점 = updatedGrade.학점 === "1" ? 0 : totalScore;

        return updatedGrade;
    });
};


  const totalsYear2 = gradesYear2.reduce((acc, curr) => {
    if (curr.성적 !== 'P') { // Adjust as needed for 'NP' or other non-numeric grades
      acc.총점 += Number(curr.총점);
      acc.출석점수 += Number(curr.출석점수);
      acc.과제점수 += Number(curr.과제점수);
      acc.중간고사 += Number(curr.중간고사);
      acc.기말고사 += Number(curr.기말고사);
      acc.학점 += Number(curr.학점);
    }
    return acc;
  }, { 학점: 0,출석점수:0,과제점수:0, 중간고사:0,기말고사:0,총점: 0});

  const calculateAverageYear2 = () => {
    const validGrades = gradesYear2.filter(grade => Number(grade.학점) !== 1);
    const totalScore = validGrades.reduce((acc, curr) => acc + curr.총점, 0);
    return validGrades.length > 0 ? (totalScore / validGrades.length).toFixed(0) : 'N/A';
  };
  
  const averageScoreYear2 = calculateAverageYear2();
  const averageGradeYear2 = getGrade(averageScoreYear2, 0); // Using normal grading for average

// table 3
  const [gradesYear3, setGradesYear3] = useState(sortGrades(dataYear3.map(grade => calculateGrade(grade))));
  const [isAddingYear3, setIsAddingYear3] = useState(false);
  const [selectedRowIndexYear3, setSelectedRowIndexYear3] = useState(null);
  const [newGradeYear3, setNewGradeYear3] = useState(initialNewGradeState);

  const addGradeYear3 = () => {
    setIsAddingYear3(true);
    setNewGradeYear3(initialNewGradeState);
  };

  const saveGradeYear3 = () => {
    if (isAddingYear3) {
      if (gradesYear3.some(grade => grade.과목명 === newGradeYear3.과목명)) {
        alert('동일한 과목명이 이미 존재합니다.');
        return;  
    }

    // Calculate total score with validation
    const totalScore = Number(newGradeYear3.출석점수) + Number(newGradeYear3.과제점수) +
                       Number(newGradeYear3.중간고사) + Number(newGradeYear3.기말고사);

    // Validate total score
    if (totalScore < 0 || totalScore > 100) {
      alert('과목별 총점은 0보다 작거나 100보다 클 수 없습니다.');
      return; // Exit without saving
    }
  
    setGradesYear3((currentGrades) => {
      let gradeWithTotal;
  
      if (newGradeYear3.학점 === "1") {
        // Directly use the selected 'P' or 'NP' for 1-credit courses
        gradeWithTotal = {
          ...newGradeYear3,
          총점: 0, // No total score needed for 1-credit courses
          성적: newGradeYear3.성적 // Directly use the selected grade
        };
      } else {
        // Calculate total score for courses with more than 1 credit
        const totalScore = Number(newGradeYear3.출석점수) + Number(newGradeYear3.과제점수) +
                           Number(newGradeYear3.중간고사) + Number(newGradeYear3.기말고사);
  
        gradeWithTotal = {
          ...newGradeYear3,
          총점: totalScore,
          성적: getGrade(totalScore, Number(newGradeYear3.학점))
        };
      }
  
      const sortedGrades = sortGrades([...currentGrades, gradeWithTotal]);
      return sortedGrades;
    });
  
      

      setIsAddingYear3(false);
      setNewGradeYear3({});
    }
  };

  const deleteGradeYear3 = () => {
    if (selectedRowIndexYear3 != null) {
      const updatedGrades = gradesYear3.filter((_, index) => index !== selectedRowIndexYear3);
      setGradesYear3(updatedGrades);
      setSelectedRowIndexYear3(null);
    }
  };

  const handleInputChangeYear3 = (event, field) => {
    let updatedValue = event.target.value;
    let numberValue = Number(updatedValue);
    if (field === '출석점수' || field === '과제점수') {
        if (numberValue < 0 || numberValue > 20) {
            alert('출석 및 과제 점수는 0보다 작거나 20보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    } else if (field === '중간고사' || field === '기말고사') {
        if (numberValue < 0 || numberValue > 30) {
            alert('중간 및 기말 점수는 0보다 작거나 30보다 클 수 없습니다.');
            return; // Exit without updating state
        }
    }

    if (field === '중간고사' || field === '기말고사') {
        updatedValue = Math.max(0, Math.min(30, numberValue)); // Clamp values between 0 and 30
    }
    if (field === '성적' && newGradeYear3.학점 === "1") {
      setNewGradeYear3((prevGrade) => ({
          ...prevGrade,
          성적: event.target.value  // Make sure this line correctly updates the state
      }));
      return;
  }
    setNewGradeYear3((prevGrade) => {
        const updatedGrade = { ...prevGrade, [field]: updatedValue };

        // Calculate the total score for all courses
        const totalScore = Number(updatedGrade.출석점수) + Number(updatedGrade.과제점수) +
                           Number(updatedGrade.중간고사) + Number(updatedGrade.기말고사);

        // Assign P or NP for 1-credit courses, or calculate letter grade for others
        updatedGrade.성적 = updatedGrade.학점 === "1"
            ? (totalScore >= 60 ? 'P' : 'NP')
            : getGrade(totalScore, Number(updatedGrade.학점));

        // Keep 총점 0 for 1-credit courses to prevent affecting GPA
        updatedGrade.총점 = updatedGrade.학점 === "1" ? 0 : totalScore;

        return updatedGrade;
    });
};


  const totalsYear3 = gradesYear3.reduce((acc, curr) => {
    if (curr.성적 !== 'P') { // Adjust as needed for 'NP' or other non-numeric grades
      acc.총점 += Number(curr.총점);
      acc.출석점수 += Number(curr.출석점수);
      acc.과제점수 += Number(curr.과제점수);
      acc.중간고사 += Number(curr.중간고사);
      acc.기말고사 += Number(curr.기말고사);
      acc.학점 += Number(curr.학점);
    }
    return acc;
  }, { 학점: 0,출석점수:0,과제점수:0, 중간고사:0,기말고사:0,총점: 0});

  const calculateAverageYear3 = () => {
    const validGrades = gradesYear3.filter(grade => Number(grade.학점) !== 1);
    const totalScore = validGrades.reduce((acc, curr) => acc + curr.총점, 0);
    return validGrades.length > 0 ? (totalScore / validGrades.length).toFixed(0) : 'N/A';
  };
  
  const averageScoreYear3 = calculateAverageYear3();
  const averageGradeYear3 = getGrade(averageScoreYear3, 0); 




  return (
    <div className="app-container">

      <h1> Front-End 과제</h1>
      <h6>202188001 3A반 아밍척</h6>
      <GradeTable
        title="1학년" 
        grades={gradesYear1} 
        addGrade={addGradeYear1} 
        saveGrade={saveGradeYear1} 
        deleteGrade={deleteGradeYear1} 
        handleInputChange={handleInputChangeYear1} 
        selectedRowIndex={selectedRowIndexYear1} 
        setSelectedRowIndex={setSelectedRowIndexYear1} 
        isAdding={isAddingYear1} 
        newGrade={newGradeYear1} 
        setNewGrade={setNewGradeYear1} 
        totals={totalsYear1}
        averageScore={averageScoreYear1}
        averageGrade={averageGradeYear1}
      />
      <GradeTable
        title="2학년" 
        grades={gradesYear2} 
        addGrade={addGradeYear2} 
        saveGrade={saveGradeYear2} 
        deleteGrade={deleteGradeYear2} 
        handleInputChange={handleInputChangeYear2} 
        selectedRowIndex={selectedRowIndexYear2} 
        setSelectedRowIndex={setSelectedRowIndexYear2} 
        isAdding={isAddingYear2} 
        newGrade={newGradeYear2} 
        setNewGrade={setNewGradeYear2} 
        totals={totalsYear2}
        averageScore={averageScoreYear2}
        averageGrade={averageGradeYear2}
      />
      <GradeTable
        title="3학년" 
        grades={gradesYear3} 
        addGrade={addGradeYear3} 
        saveGrade={saveGradeYear3} 
        deleteGrade={deleteGradeYear3} 
        handleInputChange={handleInputChangeYear3} 
        selectedRowIndex={selectedRowIndexYear3} 
        setSelectedRowIndex={setSelectedRowIndexYear3} 
        isAdding={isAddingYear3} 
        newGrade={newGradeYear3} 
        setNewGrade={setNewGradeYear3} 
        totals={totalsYear3}
        averageScore={averageScoreYear3}
        averageGrade={averageGradeYear3}
      />
    </div>
  );
};

export default App;
