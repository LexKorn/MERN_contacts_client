import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { BACK_URL } from '../config/default';

import './contactsPage.sass';


export const ContactsPage = () => {
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
            const response = await request(`${BACK_URL}/post`, 'POST', {name, phone}, {
                Authorization: `Bearer ${token}`,
            });

			if (response.status !== 200) {
				console.error(response);
			}

			setName('');
			setPhone('');
			// console.log('Success', response);
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
        await request(`${BACK_URL}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
			.then((data) => {
				// console.log('contacts', data);
				setContacts(data);
			})
			.catch((err) => console.error(err));
	};


    // DELETE contact
	const removeContactHandler = (id) => {
        request(`${BACK_URL}/post-delete/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
			.then((data) => {
				// console.log(data);
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