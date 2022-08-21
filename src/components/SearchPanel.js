export const SearchPanel = ({name, setName}) => {
    return (
        <>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <div className="input-field">
                        <input 
                            placeholder="Имя" 
                            id="search" 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label htmlFor='search'>Поиск контакта</label>
                    </div>
                </div>
            </div>
        </>
    );
};