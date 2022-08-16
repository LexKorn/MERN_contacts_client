import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { InputFields } from '../components/InputFields';
import { ContactsList } from '../components/ContactsList';
import { BACK_URL } from '../config/default';

import './contactsPage.sass';


export const ContactsPage = () => {
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
			const response = await fetch(`${BACK_URL}/post`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({ name, phone })                
			});

			const data = await response.json();

			if (response.status !== 200) {
				console.error(data);
			}

			setName('');
			setPhone('');
            fetchContacts();

		} catch(err) {
			console.error(err.message);
		}
    };


    // GET contact
    useEffect(() => {
		fetchContacts();
	}, [token]);

	const fetchContacts = async () => {
		fetch(`${BACK_URL}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
			.then((json) => json.json())
			.then((data) => {
				setContacts(data);
			})
			.catch((err) => console.error(err))
	};


    // DELETE contact
	const removeContactHandler = (id) => {
		fetch(`${BACK_URL}/post-delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },			
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
            <ContactsList contacts={contacts} handler={removeContactHandler} />          
        </div>
    );
};