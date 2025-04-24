import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const FirebaseDataEntry = () => {
  // Firebase configuration - Replace with your config
  const firebaseConfig = {
        apiKey: "AIzaSyCte3-LWDvakC_0dGqxJIvKNqCjU6jHWhw",
        authDomain: "ccs8-knotpedia.firebaseapp.com",
        projectId: "ccs8-knotpedia",
        storageBucket: "ccs8-knotpedia.firebasestorage.app",
        messagingSenderId: "375524149796",
        appId: "1:375524149796:web:7a8a8d4fca3274d47f26b1",
        measurementId: "G-KLYLR89SYJ",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [documentId, setDocumentId] = useState('');
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [history, setHistory] = useState('');
  const [image, setImage] = useState('');
  const [steps, setSteps] = useState([{ id: 1, description: '', image: '' }]);
  const [tags, setTags] = useState(['']);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [showStatus, setShowStatus] = useState(false);

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map(step => step.id)) + 1 : 1;
    setSteps([...steps, { id: newId, description: '', image: '' }]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const updateStep = (id, field, value) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const updateTag = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const clearForm = () => {
    setDocumentId('');
    setName('');
    setActivity('');
    setCategory('');
    setDescription('');
    setDifficulty('');
    setHistory('');
    setImage('');
    setSteps([{ id: 1, description: '', image: '' }]);
    setTags(['']);
    setShowStatus(false);
  };

  const submitToFirebase = async () => {
    try {
      if (!documentId.trim()) {
        throw new Error("Document ID is required");
      }

      // Prepare steps object
      const stepsObject = {};
      steps.forEach(step => {
        stepsObject[`step ${step.id}`] = {
          description: step.description.trim(),
          image: step.image.trim()
        };
      });

      // Prepare tags array (filter out empty strings)
      const tagsArray = tags.filter(tag => tag.trim() !== '');

      // Prepare document data
      const formData = {
        name: name.trim(),
        activity: activity.trim(),
        category: category.trim(),
        description: description.trim(),
        difficulty: difficulty.trim(),
        history: history.trim(),
        image: image.trim(),
        steps: stepsObject,
        tags: tagsArray
      };

      // Submit to Firebase
      await setDoc(doc(db, 'knots', documentId), formData);

      // Show success message
      setStatus({
        message: `Document ${documentId} successfully added to Firebase!`,
        type: 'success'
      });
      setShowStatus(true);
      console.log("Document successfully written!");
      
      // Automatically clear form on success
      clearForm();
      
      // Keep the success message visible
      setShowStatus(true);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      
      // Show error message
      setStatus({
        message: `Error: ${error.message}`,
        type: 'error'
      });
      setShowStatus(true);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <h1>Firebase Data Entry Form</h1>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Document ID:
        </label>
        <input 
          type="text" 
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          placeholder="Enter document ID ex: adjustablesling (no space between/smallleters) "
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Name:
        </label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name ex: Adjustable Sling (space between/start with big letter every word)"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Activity:
        </label>
        <input 
          type="text" 
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter activity"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Category:
        </label>
        <input 
          type="text" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Description:
        </label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3" 
          placeholder="Enter description"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Difficulty:
        </label>
        <input 
          type="text" 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="Enter difficulty"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          History:
        </label>
        <textarea 
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          rows="3" 
          placeholder="Enter history"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Image:
        </label>
        <input 
          type="text" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image path"
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Steps:
        </label>
        {steps.map((step) => (
          <div 
            key={step.id}
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              marginBottom: '10px', 
              backgroundColor: '#f9f9f9' 
            }}
          >
            <h3>Step {step.id}</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Description:
              </label>
              <textarea 
                value={step.description}
                onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                rows="2" 
                placeholder="Enter step description"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box', 
                  marginBottom: '10px' 
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Image:
              </label>
              <input 
                type="text" 
                value={step.image}
                onChange={(e) => updateStep(step.id, 'image', e.target.value)}
                placeholder="Enter step image path"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box', 
                  marginBottom: '10px' 
                }}
              />
            </div>
            <button 
              type="button" 
              onClick={() => removeStep(step.id)}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Remove Step
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addStep}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Add Step
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Tags:
        </label>
        {tags.map((tag, index) => (
          <div 
            key={index}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '5px' 
            }}
          >
            <input 
              type="text" 
              value={tag}
              onChange={(e) => updateTag(index, e.target.value)}
              placeholder="Enter tag"
              style={{ 
                flex: 1, 
                padding: '8px', 
                boxSizing: 'border-box', 
                marginRight: '10px' 
              }}
            />
            <button 
              type="button" 
              onClick={() => removeTag(index)}
              style={{ 
                padding: '8px 12px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              X
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addTag}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Add Tag
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          type="button" 
          onClick={submitToFirebase}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            marginRight: '10px' 
          }}
        >
          Submit to Firebase
        </button>
        <button 
          type="button" 
          onClick={clearForm}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Clear Form
        </button>
      </div>
      
      {showStatus && (
        <div 
          style={{ 
            marginTop: '20px', 
            padding: '10px', 
            borderRadius: '4px', 
            backgroundColor: status.type === 'success' ? '#dff0d8' : '#f2dede',
            color: status.type === 'success' ? '#3c763d' : '#a94442'
          }}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FirebaseDataEntry;