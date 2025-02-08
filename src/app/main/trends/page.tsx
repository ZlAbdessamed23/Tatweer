"use client"

import React from 'react'
import TrendsPieChart from './components/TrendsPieChart';
import BankCardDisplay from './components/BankCardDisplay';
import CardForm from './components/CardForm';

const Trends = () => {

    const fetchedData = [
        { name: 'Field A', value: 400 },
        { name: 'Field B', value: 300 },
        { name: 'Field C', value: 300 },
        { name: 'Field D', value: 200 },
    ];

    const fakeBankCardData = [
        {
            cardId: "1",
            cardType: "Visa",
            cardHolderName: "John Doe",
            cardNumber: "1234 5678 9012 3456",
            cardExpirationDate: "12/26"
        },
        {
            cardId: "2",
            cardType: "MasterCard",
            cardHolderName: "Jane Smith",
            cardNumber: "9876 5432 1098 7654",
            cardExpirationDate: "11/24"
        },
        {
            cardId: "3",
            cardType: "American Express",
            cardHolderName: "Alice Brown",
            cardNumber: "3782 822463 10005",
            cardExpirationDate: "07/25"
        }
    ];


    return (
        <div>
            <div className='flex gap-4 mb-8'>
                <div className='w-2/5'>
                    <h2 className='text-xl text-main-blue font-medium mb-8'>News</h2>
                    <TrendsPieChart data={fetchedData} />
                </div>
                <div className='flex flex-col gap-8'>
                    <h2 className='text-xl text-main-blue font-medium'>Cards List</h2>
                    {
                        fakeBankCardData.map((data,i) => (<BankCardDisplay key={i} props={data} />))
                    }
                </div>

            </div>
            <div className='flex gap-4'>
                <div className='w-2/3'>
                    <h2 className='text-xl text-main-blue font-medium mb-8'>Add New Card</h2>
                    <CardForm />
                </div>
                <div className='flex flex-col gap-8'>
                    <h2 className='text-xl text-main-blue font-medium'>Cards List</h2>
                    {
                        fakeBankCardData.map((data,i) => (<BankCardDisplay key={i} props={data} />))
                    }
                </div>

            </div>
        </div>
    )
};

export default Trends