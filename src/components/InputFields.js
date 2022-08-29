import { useEffect } from 'react';

export const InputFields = ({name, setName, phone, setPhone, handler, title, button}) => {
    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const keyPress = (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            handler()
        }
    };

    return (
        <>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h1>{title}</h1>
                    <div className="input-field">
                        <input 
                            placeholder="Имя" 
                            id="name" 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onKeyPress={e => keyPress(e)} />
                        <label htmlFor='link'>Введите имя</label>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Телефон" 
                            id="phone" 
                            type="text" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            onKeyPress={e => keyPress(e)} />
                        <label htmlFor='link'>Введите телефон</label>
                    </div>
                    <button className="blue darken-1 btn" onClick={handler}>{button}</button> 
                </div>                           
            </div> 
        </>
    );
}