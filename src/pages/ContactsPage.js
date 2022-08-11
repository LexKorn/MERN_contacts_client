import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

// import { useHttp } from '../hooks/http.hook';
// import { AuthContext } from '../context/AuthContext';
import { InputFields } from '../components/InputFields';
import { BACK_URL } from '../config/default';

import './contactsPage.sass';


export const ContactsPage = () => {
    // const auth = useContext(AuthContext);
    // const {request} = useHttp();
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
			const response = await fetch(`${BACK_URL}/post`, {
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
            fetchContacts();

		} catch(err) {
			console.error(err.message);
		}
    };


    // GET contact
    useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		fetch(`${BACK_URL}`)
			.then((json) => json.json())
			.then((data) => {
				console.log('contacts', data);
				setContacts(data);
			})
			.catch((err) => console.error(err))
	};


    // DELETE contact
	const removeContactHandler = (id) => {
		fetch(`${BACK_URL}/post-delete/${id}`, {
			method: 'DELETE',
		})
			.then((json) => json.json())
			.then((data) => {
				console.log(data);
				fetchContacts();
			})
			.catch((err) => console.error(err))
	};


    return (
        <div>
            <InputFields 
                name={name} 
                setName={setName} 
                phone={phone} 
                setPhone={setPhone} 
                handler={createContactHandler} 
                title='Создай контакт'
                button='Создать' /> 
            <div className='row'>
                <ul className="col s6 offset-s3 collection z-depth-4">
                    {contacts.map((contact) => (
                        <li className="collection-item contact" key={contact._id}>
                            <div className="contact_text">
                                <div><b>{contact.name}</b></div>
                                <div>{contact.phone}</div> 
                            </div>                           
                            <div className="contact_icons">
                                <NavLink to={`/post/${contact._id}`}>
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