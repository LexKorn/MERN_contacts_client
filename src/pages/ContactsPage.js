import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHttp } from '../hooks/http.hook';
// import { AuthContext } from '../context/AuthContext';
import { BACK_URL } from '../config/default';


export const ContactsPage = () => {
    // const auth = useContext(AuthContext);
    // const {request} = useHttp();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const createContactHandler = async () => {
        if (!name.trim() || !phone.trim()) {
			alert('Все поля обязательны для заполнения');
			return console.error('Все поля обязательны для заполнения');
		}

		try {
			const response = await fetch(`${BACK_URL}/api/contacts/post`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({ name, phone })                
			});

			const data = await response.json();

			if (response.status !== 200) {
				console.error(data);
			}

			setName('');
			setPhone('');
			console.log('Success', data);
            navigate('/');

		} catch(err) {
			console.error(err.message);
		}
    }

    useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		fetch(`${BACK_URL}/api/contacts`)
			.then((json) => json.json())
			.then((data) => {
				console.log('posts', data);
				setPosts(data);
			})
			.catch((err) => console.error(err))
	};

    return (
        <div>
            <h1>Создай контакт</h1>
            <div className='row'>
                <div className='col s4 offset-s4'>
                    <div className="input-field">
                        <input 
                            placeholder="Имя" 
                            id="name" 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label htmlFor='link'>Введите имя</label>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Телефон" 
                            id="phone" 
                            type="text" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        <label htmlFor='link'>Введите телефон</label>
                    </div>
                    <button class="blue darken-1 btn" onClick={createContactHandler}>Создать</button> 
                </div>                           
            </div>   
            <div className='row'>
                <ul>
                    {posts.map((post) => (
                        <li key={post._id}>{post.name}  {post.phone}</li>
                    ))}
                </ul>
            </div>         
        </div>
    );
};