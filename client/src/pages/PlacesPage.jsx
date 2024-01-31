import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from "../Perks.jsx";
import axios from "axios";


export default function PlacesPages() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>

        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}

            </>
        );
    }

    async function addPhotoByLink(ev){
        ev.preventDefault();
         const {data:filename} = await axios.post('/uploadByLink', {link:photoLink});
         setAddedPhotos(prev => {
            return [...prev, filename];
         });
    }


    return (
        <div>
            {action !== 'new' && (
                <div className="">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new places
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'title for your place')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: apartment" />
                        {preInput('Address', 'Address of the place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos', 'more = better')}
                        <div className='flex gap-2'>
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                                placeholder={'Add using a link'} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 p-4 rounded-2xl'>Add&nbsp;Photos</button>
                        </div>
                        <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid'>
                            <button className='flex gap-1 justify-center border bg-transparent rounded-2xl p-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Description', 'description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                        {preInput('Perks', 'select all the perks')}
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('ExtraInfo', 'house rules, etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        {preInput('Check IN & OUT Timings, max guest', 'some details')}
                        <div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder='14:00' />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='14:00' />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1"> Max guest</h3>

                                <input type="text" value={maxGuest} onChange={ev => setMaxGuests(ev.target.value)} />

                            </div>
                        </div>
                        <button className='primary my-4'> Save </button>

                    </form>
                </div>
            )}
        </div>
    );

}