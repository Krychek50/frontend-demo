export interface ITableEntry {
  Id: string;
  Value?: string;
}

export class BackendAPI {
  private static API_URL = 'https://gpclnin8ok.execute-api.eu-west-2.amazonaws.com';

  // Create table item
  public static async addItem(item: ITableEntry): Promise<ITableEntry[]> {
    const request: RequestInit =  {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }

    await fetch(BackendAPI.API_URL, request);
    return await BackendAPI.getList();
  }

  // Read table item list
  public static async getList(): Promise<ITableEntry[]> {
    const request: RequestInit =  {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(BackendAPI.API_URL, request);
    return await response.json();
  }

  // Read table item id
  public static async getItem(item: ITableEntry): Promise<ITableEntry[]> {
    const request: RequestInit =  {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(`${BackendAPI.API_URL}/${item.Id}`, request);
    return await response.json();
  }

  // Update table item id
  public static async updateItem(item: ITableEntry): Promise<ITableEntry[]> {
    const request: RequestInit =  {
      method: 'PUT',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }

    await fetch(`${BackendAPI.API_URL}/${item.Id}`, request);
    return await BackendAPI.getList();
  }

  // Delete table item id
  public static async deleteItem(item: ITableEntry): Promise<ITableEntry[]> {
    const request: RequestInit =  {
      method: 'DELETE',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    await fetch(`${BackendAPI.API_URL}/${item.Id}`, request);
    return await BackendAPI.getList();
  }
}