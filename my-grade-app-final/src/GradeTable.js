import React from 'react';

const GradeTable = ({
  title,
  grades,
  addGrade,
  saveGrade,
  deleteGrade,
  handleInputChange,
  selectedRowIndex,
  setSelectedRowIndex,
  isAdding,
  newGrade,
  setNewGrade,
  totals,
  averageScore,
  averageGrade
}) => {
  return (
    <div className="year-container">
      <div className="header-container">
          <h2>{title}</h2>
          <div className="button-container">
            <button type="button" onClick={addGrade}>추가</button>
            <button type="button" onClick={saveGrade} disabled={!isAdding}>저장</button>
            <button type="button" onClick={deleteGrade} disabled={selectedRowIndex === null}>삭제</button>
          </div>
        </div>
        <table>
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
        {grades.map((grade, index) => (
            <tr key={index} onClick={() => setSelectedRowIndex(index)} 
            style={{ backgroundColor: index === selectedRowIndex ? '#FA7575' : '' }}>
              <td>{grade.이수}</td>
              <td>{grade.필수}</td>
              <td>{grade.과목명}</td>
              <td>{grade.학점}</td>
              <td>{grade.출석점수}</td>
              <td>{grade.과제점수}</td>
              <td>{grade.중간고사}</td>
              <td>{grade.기말고사}</td>
              <td>{grade.학점 !== "1" ? grade.총점 : ''}</td>
              <td></td>
              <td style={{ color: grade.성적 === 'F' ? 'red' : 'black' }}>{grade.성적}</td>
            </tr>
          ))}
                   {isAdding && (
            <tr>
              <td>
              <select value={newGrade.이수} onChange={(e) => handleInputChange(e, '이수')}>
                <option value="">Select</option>
                <option value="교양">교양</option>
                <option value="전공">전공</option>
              </select>
              </td>
              <td>
              <select value={newGrade.필수} onChange={(e) => handleInputChange(e, '필수')}>
                <option value="">Select</option>
                <option value="선택">선택</option>
                <option value="필수">필수</option>
              </select>
              </td>
              <td><input type="text" value={newGrade.과목명} onChange={(e) => handleInputChange(e, '과목명')} /></td>
              <td>
              <select value={newGrade.학점} onChange={(e) => handleInputChange(e, '학점')}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              </td>
              {newGrade.학점 === "1" ? (
              <React.Fragment>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                <select value={newGrade.성적} onChange={(e) => handleInputChange(e, '성적')}>
                    <option value="P">Pass</option>
                    <option value="NP">Non-Pass</option>
                </select>
                </td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td><input type="number" value={newGrade.출석점수} onChange={(e) => handleInputChange(e, '출석점수')} /></td>
                <td><input type="number" value={newGrade.과제점수} onChange={(e) => handleInputChange(e, '과제점수')} /></td>
                <td><input type="number" value={newGrade.중간고사} onChange={(e) => handleInputChange(e, '중간고사')} /></td>
                <td><input type="number" value={newGrade.기말고사} onChange={(e) => handleInputChange(e, '기말고사')} /></td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
              </React.Fragment>
            )}
            </tr>
          )} 
        </tbody>
        <tfoot>
          <tr>
            <td id= "sum" colSpan="3">합계</td>
            <td>{totals.학점}</td>
            <td>{totals.출석점수}</td>
            <td>{totals.과제점수}</td>
            <td>{totals.중간고사}</td>
            <td>{totals.기말고사}</td>
            <td>{totals.총점}</td>
            <td>{averageScore}</td>
            <td style={{ color: averageGrade === 'F' ? 'red' : 'black' }}>{averageGrade}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GradeTable;
