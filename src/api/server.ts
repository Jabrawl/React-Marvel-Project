let token = "9924ed8ff6691096b4c264026962dc732fb96d0ff67b1151"

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://blushing-therapeutic-navy.glitch.me/api/heros`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://blushing-therapeutic-navy.glitch.me/api/heros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok){
            throw new Error('Failed to Create new data on server')
        }
        return await response.json()
    },

    update: async(id:string, data: any = {}) => {
        const response = await fetch(`https://blushing-therapeutic-navy.glitch.me/api/heros/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },

    delete: async(id:string) => {
        const response = await fetch(`https://blushing-therapeutic-navy.glitch.me/api/heros/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}