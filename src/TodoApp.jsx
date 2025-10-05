import React, { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // LocalStorage에서 데이터 로드 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    console.log('=== 컴포넌트 마운트: LocalStorage 로드 시작 ===');
    const savedTodos = localStorage.getItem('react-todos');
    const savedDarkMode = localStorage.getItem('dark-mode');
    
    console.log('저장된 데이터:', savedTodos);
    console.log('저장된 다크모드:', savedDarkMode);
    
    // 다크모드 설정 로드
    if (savedDarkMode) {
      const darkModeValue = JSON.parse(savedDarkMode);
      setIsDarkMode(darkModeValue);
      
      // body 태그에 dark 클래스 설정
      if (darkModeValue) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
    
    if (savedTodos && savedTodos !== '[]') {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        console.log('파싱된 데이터:', parsedTodos);
        if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
          setTodos(parsedTodos);
          console.log('✅ 데이터 로드 성공:', parsedTodos);
        } else {
          console.log('빈 배열이므로 로드하지 않음');
        }
      } catch (error) {
        console.error('파싱 에러:', error);
        setTodos([]);
      }
    } else {
      console.log('저장된 데이터가 없음');
    }
  }, []);

  // todos 상태가 변경될 때마다 저장
  useEffect(() => {
    console.log('=== todos 변경됨:', todos);
    console.log('todos 길이:', todos.length);
    
    if (todos.length > 0) {
      localStorage.setItem('react-todos', JSON.stringify(todos));
      console.log('✅ LocalStorage에 저장됨:', todos);
    } else {
      console.log('빈 배열이므로 저장하지 않음');
    }
  }, [todos]);

  // 다크모드 상태 저장 및 body 클래스 업데이트
  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    
    // body 태그에 dark 클래스 추가/제거
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addTodo = () => {
    const trimmedText = inputText.trim();
    if (trimmedText !== '') {
      setTodos(prevTodos => [...prevTodos, { text: trimmedText, completed: false }]);
      setInputText('');
    } else {
      alert('할 일을 입력해주세요!');
    }
  };

  const toggleTodo = (todoToToggle) => {
    setTodos(todos.map(todo => 
      todo === todoToToggle ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter(todo => todo !== todoToDelete));
  };

  const reorderTodos = (oldIndex, newIndex) => {
    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  // 일괄 작업 함수들
  const completeAll = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('react-todos');
    setTodos([]);
    console.log('LocalStorage cleared');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter(todo => {
    // 검색 필터
    const matchesSearch = todo.text.toLowerCase().includes(searchText.toLowerCase());
    
    // 상태 필터
    if (filter === 'active') return !todo.completed && matchesSearch;
    if (filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch; // 'all'
  });

  // 통계 계산
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-pink-50 text-gray-900'
    }`}>
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-3 ${
            isDarkMode ? 'text-white' : 'text-gray-600'
          }`}>
            <img 
              src="./pink-dot-star96.png" 
              alt="루미" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            루미의 Todo 리스트 ver2
          </h1>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            할 일을 관리하고 꿈을 이뤄가세요! 💕
          </p>
        </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}>
        <div className={`p-6 rounded-2xl mb-6 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
            : 'bg-white/80 backdrop-blur-sm border border-pink-200 shadow-pink-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="✨ 새로운 할 일을 입력하세요"
              className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white/90 border-pink-200 text-gray-900 placeholder-pink-400'
              }`}
            />
            <button 
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-pink-300 hover:bg-pink-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:scale-105"
            >
              ✨ 추가하기
            </button>
          </div>
        </div>
      </form>
      
      {/* 검색 및 필터 */}
      <div className={`p-6 rounded-2xl mb-6 transition-all duration-300 shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
          : 'bg-white/80 backdrop-blur-sm border border-pink-200 shadow-pink-100'
      }`}>
        <div className="mb-4">
          <input 
            type="text"
            placeholder="🔍 할 일을 검색해보세요..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white/90 border-pink-200 text-gray-900 placeholder-pink-400'
            }`}
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button 
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-pink-300 to-pink-500 text-white shadow-lg' 
                : isDarkMode
                  ? 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:scale-105'
                  : 'bg-white/80 text-pink-600 border border-pink-200 hover:bg-pink-50 hover:scale-105'
            }`}
            onClick={() => setFilter('all')}
          >
            📋 전체
          </button>
          <button 
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'active' 
                ? 'bg-gradient-to-r from-pink-300 to-pink-500 text-white shadow-lg' 
                : isDarkMode
                  ? 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:scale-105'
                  : 'bg-white/80 text-pink-600 border border-pink-200 hover:bg-pink-50 hover:scale-105'
            }`}
            onClick={() => setFilter('active')}
          >
            ⏳ 진행중
          </button>
          <button 
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'completed' 
                ? 'bg-gradient-to-r from-pink-300 to-pink-500 text-white shadow-lg' 
                : isDarkMode
                  ? 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:bg-gray-600 hover:scale-105'
                  : 'bg-white/80 text-pink-600 border border-pink-200 hover:bg-pink-50 hover:scale-105'
            }`}
            onClick={() => setFilter('completed')}
          >
            ✅ 완료
          </button>
        </div>
      </div>

      {/* 통계 및 진행률 */}
      {totalTodos > 0 && (
        <div className={`p-6 rounded-xl mb-6 transition-all duration-300 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
            : 'bg-white/80 backdrop-blur-sm border border-pink-200 shadow-pink-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>전체: {totalTodos}</span>
            <span className="text-sm font-medium text-pink-400">진행중: {pendingTodos}</span>
            <span className="text-sm font-medium text-pink-500">완료: {completedTodos}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex-1 h-4 rounded-full overflow-hidden ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div 
                className="h-full bg-pink-300 transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold min-w-[80px] ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {progressPercentage}% 완료
            </span>
          </div>
        </div>
      )}

      {/* 일괄 작업 버튼 */}
      {totalTodos > 0 && (
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-6">
          <button 
            onClick={completeAll} 
            className="px-6 py-3 bg-pink-300 hover:bg-pink-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:scale-105"
          >
            모두 완료
          </button>
          <button 
            onClick={deleteAll} 
            className="px-6 py-3 bg-blue-300 hover:bg-blue-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:scale-105"
          >
            모두 삭제
          </button>
        </div>
      )}
      
      {/* 할 일 목록 또는 빈 상태 메시지 */}
      {todos.length === 0 ? (
        <div className={`text-center py-12 transition-colors ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-lg mb-2">📝 아직 할 일이 없습니다.</p>
          <p className="text-sm">새로운 할 일을 추가해보세요!</p>
        </div>
      ) : (
        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
          isDarkMode={isDarkMode}
        />
      )}
      </div>
      
      {/* 데이터 초기화 버튼 - 작게 맨 밑에 */}
      {totalTodos > 0 && (
        <div className="text-center mt-8 mb-4">
          <button 
            onClick={clearLocalStorage} 
            className="text-xs px-3 py-1 rounded-full bg-pink-300 hover:bg-pink-500 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-200"
          >
            데이터 초기화
          </button>
        </div>
      )}
      
      {/* 오른쪽 하단 고정 다크모드 버튼 */}
      <button
        onClick={toggleDarkMode}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 ${
          isDarkMode 
            ? 'bg-pink-300 hover:bg-pink-500 text-white shadow-pink-200' 
            : 'bg-pink-300 hover:bg-pink-500 text-white shadow-pink-200'
        }`}
        title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default TodoApp;
