import React, { useEffect, useState } from 'react'

const TodoCrud = () => {
  const [names, setNames] = useState(JSON.parse(localStorage.getItem('names')) || []);
  const [inputText, setInputText] = useState('');
  const [editText, editInputText] = useState('');
  const [index, setIndex] = useState(null);

  // Save data to local storage whenever the names state changes
  useEffect(() => {
    console.log('Saving names to local storage:', names);
    localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  //Insert
  const addName = () => {
    if(inputText !== ''){
        setNames([...names, inputText]);        
        setInputText('');
    }
  }
  
  //Update
  const editName = () => {
    if(editText.trim() !== ''){
      const updateName = names.map((x, i) => i === index ? editText.trim() : x);
      setNames(updateName);
      setIndex(null);
      editInputText('');
    }
  }

  //Get Index
  const getIndex = (index) => {
    setIndex(index);
    editInputText(names[index])
  }

  //Delete
  const deleteName = (index) => {
    const updatedName = names.filter((_, i) => i !== index);
    setNames(updatedName);
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Todo App</h1>
        <div className='flex justify-center items-center gap-2'>
          <div className="flex mb-4">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Add a new todo" className="border rounded p-2 mr-2"/>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={addName}>Add</button>
          </div>
          {editText !== '' && (
            <div className='flex mb-4'>
              <input type='text' value={editText} onChange={(e) => editInputText(e.target.value)} className='border rounded p-2 mr-2'/>
              <button onClick={editName} className='bg-green-500 text-white p-2 rounded'>Update</button>
            </div>
          )}
        </div>
        <ul className="w-1/2">
            {names.map((name, index) => (
            <li
                key={index}
                className="flex justify-between items-center bg-white p-2 mb-2 shadow rounded"
            >
                {name}
                <div>
                <button
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    onClick={() => getIndex(index)}>
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => deleteName(index)}>
                    Delete
                </button>
                </div>
            </li>
            ))}
        </ul>
    </div>    
  )

}

export default TodoCrud