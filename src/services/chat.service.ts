import realTimeApi from '../libs/realTimeApi';

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: number;
}

export interface ChatRoom {
  id: string;
  users: string[]; // 1:1 채팅이므로 2명
  lastMessage?: ChatMessage;
}

// 채팅방 생성 (1:1)
export async function createChatRoom(userA: string, userB: string): Promise<ChatRoom> {
  const users = [userA, userB].sort();
  const roomId = `${users[0]}_${users[1]}`;
  const roomPath = `/chatRooms/${roomId}`;
  const room: ChatRoom = { id: roomId, users };
  console.log('[chat.service] createChatRoom', { userA, userB, roomId });
  const exists = await realTimeApi.fetch<ChatRoom>({ path: roomPath });
  if (!exists) {
    await realTimeApi.set(roomPath, room);
    await realTimeApi.set(`/userChats/${userA}/${roomId}`, true);
    await realTimeApi.set(`/userChats/${userB}/${roomId}`, true);
    // 진단용 fetch
    const userAChats = await realTimeApi.fetch({ path: `/userChats/${userA}` });
    const userBChats = await realTimeApi.fetch({ path: `/userChats/${userB}` });
    console.log('[chat.service] userAChats after set', userA, userAChats);
    console.log('[chat.service] userBChats after set', userB, userBChats);
  }
  return room;
}

export async function getMyChatRooms(userId: string): Promise<ChatRoom[]> {
  console.log('[chat.service] getMyChatRooms', userId);
  const userChats = await realTimeApi.fetch<{ [roomId: string]: true }>({ path: `/userChats/${userId}` });
  console.log('[chat.service] getMyChatRooms userChats:', userChats);
  if (!userChats) return [];
  const roomIds = Object.keys(userChats);
  const rooms = await Promise.all(
    roomIds.map(async (roomId) => await realTimeApi.fetch<ChatRoom>({ path: `/chatRooms/${roomId}` }))
  );
  console.log('[chat.service] getMyChatRooms rooms:', rooms);
  return rooms.filter(Boolean);
}

export async function sendMessage(roomId: string, message: Omit<ChatMessage, 'id'>): Promise<void> {
  try {
    console.log('[chat.service] sendMessage 파라미터', { roomId, message });
    const msgRef = await realTimeApi.push(`/chatRooms/${roomId}/messages`, null);
    if (!msgRef || !msgRef.key) throw new Error('msgRef.key 없음');
    const msgId = msgRef.key;
    const msg: ChatMessage = { ...message, id: msgId };
    await realTimeApi.set(`/chatRooms/${roomId}/messages/${msgId}`, msg);
    await realTimeApi.set(`/chatRooms/${roomId}/lastMessage`, msg);
    console.log('[chat.service] sendMessage 성공', msg);
  } catch (e) {
    console.error('[chat.service] sendMessage 에러', e);
    throw e;
  }
}

export function subscribeMessages(roomId: string, callback: (messages: ChatMessage[]) => void): () => void {
  console.log('[chat.service] subscribeMessages', roomId);
  return realTimeApi.subscribe<{ [id: string]: ChatMessage }>({
    path: `/chatRooms/${roomId}/messages`,
    callback: (data) => {
      console.log('[chat.service] subscribeMessages 콜백', data);
      if (!data) return callback([]);
      const arr = Object.values(data) as ChatMessage[];
      arr.sort((a, b) => a.createdAt - b.createdAt);
      callback(arr);
    },
  });
} 