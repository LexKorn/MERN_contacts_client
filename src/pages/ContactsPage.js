import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { BACK_URL } from '../config/default';

import './contactsPage.sass';


export const ContactsPage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);


    // POST contact
    const createContactHandler = async () => {
        if (!name.trim() || !phone.trim()) {
			alert('Все поля обязательны для заполнения');
			return console.error('Все поля обязательны для заполнения');
		}

		try {
			// const response = await fetch(`${BACK_URL}/post`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify({ name, phone })                
			// });

            const response = await request(`${BACK_URL}/post`, 'POST', {
                Authorization: `Bearer ${token}`,
                // body: JSON.stringify({ name, phone }) 
            });

			// const data = await response.json();

			if (response.status !== 200) {
				console.error(response);
			}

			setName('');
			setPhone('');
			console.log('Success', response);
            fetchContacts();

		} catch(err) {
			console.error(err.message);
		}
    };


    // GET contact
    useEffect(() => {
		fetchContacts();
	}, [token, request]);

	const fetchContacts = async () => {
		// fetch(`${BACK_URL}`)
		// 	.then((json) => json.json())
		// 	.then((data) => {
		// 		console.log('contacts', data);
		// 		setContacts(data);
		// 	})
		// 	.catch((err) => console.error(err))

        await request(`${BACK_URL}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
            // .then((json) => json.json())
			.then((data) => {
				console.log('contacts', data);
				setContacts(data);
			})
			.catch((err) => console.error(err));
	};


    // DELETE contact
	const removeContactHandler = (id) => {
		// fetch(`${BACK_URL}/post-delete/${id}`, {
		// 	method: 'DELETE',
		// })
		// 	.then((json) => json.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 		fetchContacts();
		// 	})
		// 	.catch((err) => console.error(err));

        request(`${BACK_URL}/post-delete/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
            // .then((json) => json.json())
			.then((data) => {
				console.log(data);
				fetchContacts();
			})
			.catch((err) => console.error(err));
	};


    return (
        <div>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h1>Создай контакт</h1>
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
                    <button className="blue darken-1 btn" onClick={createContactHandler}>Создать</button> 
                </div>                           
            </div>   
            <div className='row'>
                <ul className="col s6 offset-s3 collection z-depth-4">
                    {contacts.map((contact) => (
                        <li className="collection-item contact" key={contact._id}>
                            <div className="contact_text">
                                <div><b>{contact.name}</b></div>
                                <div>{contact.phone}</div> 
                            </div>                           
                            <div className="contact_icons">
                                <NavLink to={`/contacts/${contact._id}`}>
                                    <i className="material-icons">mode_edit</i>
                                </NavLink>    
                                <i className="material-icons" 
                                    onClick={() => removeContactHandler(contact._id)}>delete_forever
                                </i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>         
        </div>
    );
};