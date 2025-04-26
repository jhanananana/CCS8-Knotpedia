import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';

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

  const [knotsList, setKnotsList] = useState([]);
  const [selectedKnot, setSelectedKnot] = useState('');
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedKnot) {
      const knot = knotsList.find(k => k.id === selectedKnot);
      if (knot) {
        setIsEditing(true);
        setDocumentId(knot.id);
        setName(knot.name || '');
        setActivity(knot.activity || '');
        setCategory(knot.category || '');
        setDescription(knot.description || '');
        setDifficulty(knot.difficulty || '');
        setHistory(knot.history || '');
        setImage(knot.image || '');
        
        // Convert steps object to array
        if (knot.steps) {
          const stepsArray = Object.entries(knot.steps).map(([key, value]) => ({
            id: parseInt(key.replace('step ', '')),
            description: value.description || '',
            image: value.image || ''
          }));
          setSteps(stepsArray.sort((a, b) => a.id - b.id));
        } else {
          setSteps([{ id: 1, description: '', image: '' }]);
        }
        
        setTags(knot.tags || ['']);
      }
    } else {
      clearForm();
    }
  }, [selectedKnot, knotsList]);

  useEffect(() => {
    const fetchKnots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'knots'));
        const knots = [];
        querySnapshot.forEach((doc) => {
          knots.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setKnotsList(knots);
      } catch (error) {
        console.error("Error fetching knots: ", error);
      }
    };
    fetchKnots();
  }, [db]);

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map(step => step.id)) + 1 : 1;
    setSteps([...steps, { id: newId, description: '', image: '\\knots\\1\\' }]); // New step gets same initial path
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
    setSelectedKnot('');
    setDocumentId('');
    setName('');
    setActivity('');
    setCategory('');
    setDescription('');
    setDifficulty('');
    setHistory('');
    setImage('\\knots\\1\\');
    setSteps([{ id: 1, description: '', image: '\\knots\\1\\' }]);     setTags(['']);
    setShowStatus(false);
    setIsEditing(false);
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
        message: `Document ${documentId} successfully ${isEditing ? 'updated' : 'added'} to Firebase!`,
        type: 'success'
      });
      setShowStatus(true);
      
      // Refresh knots list
      const querySnapshot = await getDocs(collection(db, 'knots'));
      const knots = [];
      querySnapshot.forEach((doc) => {
        knots.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setKnotsList(knots);
      
    } catch (error) {
      console.error("Error writing document: ", error);
      setStatus({
        message: `Error: ${error.message}`,
        type: 'error'
      });
      setShowStatus(true);
    }
  };


  return (
    <div style={{ 
      fontFamily: 'Poppins', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px'
    }}>
      <h1>Knot Data Management</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Select Knot to Edit:
        </label>
        <select
          value={selectedKnot}
          onChange={(e) => setSelectedKnot(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            boxSizing: 'border-box',
            marginBottom: '10px',
            fontFamily: 'Poppins'
          }}
        >
          <option value="">-- Create New Knot --</option>
          {knotsList.map((knot) => (
            <option key={knot.id} value={knot.id}>
              {knot.name} ({knot.id})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Document ID:
        </label>
        <input 
          type="text" 
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          placeholder="Enter document ID (no spaces, lowercase)"
          style={{ 
            width: '100%', 
            fontFamily: 'Poppins',
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
          disabled={isEditing}
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
          placeholder="Enter knot name"
          style={{ 
            width: '100%', 
            fontFamily: 'Poppins',
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
            fontFamily: 'Poppins',
            padding: '8px', 
            boxSizing: 'border-box', 
            marginBottom: '10px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Image URL:
        </label>
        <input 
          type="text" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
          style={{ 
            width: '100%', 
            fontFamily: 'Poppins',
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
              border: '1px solid #ddd',
              fontFamily: 'Poppins', 
              padding: '15px', 
              marginBottom: '15px', 
              backgroundColor: '#fff',
              borderRadius: '5px'
            }}
          >
            <h3 style={{ marginTop: 0 }}>Step {step.id}</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Description:
              </label>
              <textarea 
                value={step.description}
                onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                rows="3" 
                placeholder="Enter step description"
                style={{ 
                  fontFamily: 'Poppins',
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box', 
                  marginBottom: '10px' 
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Image URL:
              </label>
              <input 
                type="text" 
                value={step.image}
                onChange={(e) => updateStep(step.id, 'image', e.target.value)}
                placeholder="Enter step image URL"
                style={{ 
                  width: '100%', 
                  fontFamily: 'Poppins',
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
                padding: '8px 15px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                fontFamily: 'Poppins',
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '4px'
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
            cursor: 'pointer',
            fontFamily: 'Poppins',
            borderRadius: '4px',
            marginRight: '10px'
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
              marginBottom: '10px',
              fontFamily: 'Poppins'
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
                marginRight: '10px',
                borderRadius: '4px',
                fontFamily: 'Poppins',
                border: '1px solid #ddd'
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
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Remove
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
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Add Tag
        </button>
      </div>
      
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button 
          type="button" 
          onClick={submitToFirebase}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            fontFamily: 'Poppins',
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
            flex: 1
          }}
        >
          {isEditing ? 'Update Knot' : 'Create Knot'}
        </button>
        <button 
          type="button" 
          onClick={clearForm}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '4px',
            fontFamily: 'Poppins',
            fontSize: '16px',
            flex: 1
          }}
        >
          Clear Form
        </button>
      </div>
      
      {showStatus && (
        <div 
          style={{ 
            marginTop: '20px', 
            padding: '15px', 
            borderRadius: '4px', 
            backgroundColor: status.type === 'success' ? '#dff0d8' : '#f2dede',
            color: status.type === 'success' ? '#3c763d' : '#a94442',
            border: `1px solid ${status.type === 'success' ? '#d6e9c6' : '#ebccd1'}`
          }}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FirebaseDataEntry;
