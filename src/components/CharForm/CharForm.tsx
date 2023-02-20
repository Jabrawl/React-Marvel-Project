import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { 
    chooseName,  
    chooseDescription, 
    choosePower,
    chooseRole, 
    chooseIdentity, 
    chooseSidekick, 
    chooseComic,
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharFormProps {
    id?:string,
    data?:{}
}

export const CharForm = (props:CharFormProps) => {
    const dispatch = useDispatch()
    let { charData, getData} = useGetData();
    const store = useStore()
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if ( props.id! ) {
            await serverCalls.update(props.id!, data)
            console.log(`Updated" ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(choosePower(data.power))
            dispatch(chooseRole(data.role))
            dispatch(chooseIdentity(data.identity))
            dispatch(chooseSidekick(data.sidekick))
            dispatch(chooseComic(data.comic))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder="name"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="power">Power</label>
                    <Input {...register('power')} name="power" placeholder="Power"/>
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <Input {...register('role')} name="role" placeholder="role"/>
                </div>
                <div>
                    <label htmlFor="identity">Identity</label>
                    <Input {...register('identity')} name="identity" placeholder="identity"/>
                </div>
                <div>
                    <label htmlFor="sidekick">Sidekick</label>
                    <Input {...register('sidekick')} name="sidekick" placeholder="sidekick"/>
                </div>
                <div>
                    <label htmlFor="comic">Comics Appeared In</label>
                    <Input {...register('comic')} name="comic" placeholder="comic"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>        
        </div>
    )
}


