//스타일 시트, 자바스크립트 데이터를 import
import "./style.css";
import data from "./data.js";
import { useState } from "react";

/*

./ : 지금 여기 폴더
../ : 상위 폴더로 
/ : 프로젝트 경로
/src : src 폴더로 들어가서

*/

export default function Accordion() {
  //선택된 title의 번호를 저장할 state(UI와 연결된 변수)
  let [selected, setSelected] = useState(null);
  // 플래그(단일선택 // 다중선택)
  let [enableMultiSelection, setEnableMultiSelection] = useState(false); //false면 단일, true면 다중
  let [selectedList, setSelectedList] = useState([]);

  function clickTitle(id) {
    //console.log(id);
    //setSelected(id)
    selected !== id ? setSelected(id) : setSelected(null);
  }

  //다중 선택일때는 선택된 애들을 '모두 보관' ==> 배열
  //console.log(enableMultiSelection);
  //console.log(selectedList.indexOf());

  function multiSelectTitle(id) {
    // 배열의 값을 갱신하기 위해서는 ...spread 분해했다가 다시 [] 로 감싼다
    // 객체의 값을 갱신하기 위해서는 ...spread 분해했다가 다시 {} 로 감싼다
    let copyList = [...selectedList];
    //console.log(selectedList.indexOf(id));
    //다중 선택 배열에서 id 값을 검사
    // indexOf() : 만약 배열에서 id를 찾을 수 없다면 없다면 -1 그 위치를
    // 있는지 검사 == > 없으면 추가
    let findIdexOfId = selectedList.indexOf(id); // id 이미 있으면 그 위치
    //jsx가 아닌 js문법이니깐 if-else 가능
    if (findIdexOfId === -1) {
      copyList.push(id);
    } else {
      //splice(인덱스, 몇개 없앨건지)
      copyList.splice(findIdexOfId, 1); // 찾은 인덱스로부터 1개 없앰
    }
    setSelectedList(copyList);
    console.log(copyList);
  }

  return (
    <>
      <div className="wrapper">
        <button
          onClick={() => {
            setEnableMultiSelection(!enableMultiSelection);
          }}
        >
          다중선택 ON/OFF
        </button>
        <div className="accordion">
          {data.map((el, idx) => {
            return (
              <>
                <div className="item" key={idx}>
                  <div
                    className="title"
                    onClick={() => {
                      enableMultiSelection === true
                        ? multiSelectTitle(el.id)
                        : clickTitle(el.id);
                    }}
                  >
                    <h3>{el.title}</h3>
                    <span>+</span>
                  </div>

                  {enableMultiSelection === true
                    ? selectedList.indexOf(el.id) !== -1 && (
                        <div className="content">{el.content}</div>
                      )
                    : selected === el.id && (
                        <div className="content">{el.content}</div>
                      )}

                  {/* {selected === el.id && enableMultiSelection === false ? (
                    <div className="content">{el.content}</div>
                  ) : null} */}
                </div>
              </>
            );
          })}

          {/* item */}
          {/* <div className="item">
            <div className="title">
              <h3>{data[0].title}</h3>
              <span>+</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
