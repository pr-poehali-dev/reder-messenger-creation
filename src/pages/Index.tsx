import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [message, setMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('общий');

  const servers = [
    { id: 1, name: 'R', active: true },
    { id: 2, name: 'G', active: false },
    { id: 3, name: 'D', active: false },
  ];

  const channels = [
    { name: 'общий', type: 'text', unread: 3 },
    { name: 'случайное', type: 'text', unread: 0 },
    { name: 'мемы', type: 'text', unread: 12 },
    { name: 'помощь', type: 'text', unread: 0 },
    { name: 'Общий чат', type: 'voice', users: 5 },
    { name: 'Игры', type: 'voice', users: 2 },
  ];

  const messages = [
    {
      id: 1,
      user: 'Александр',
      avatar: 'A',
      time: '12:34',
      content: 'Привет всем! Как дела?',
      online: true
    },
    {
      id: 2,
      user: 'Мария',
      avatar: 'М',
      time: '12:35',
      content: 'Отлично! Работаю над новым проектом 🚀',
      online: true
    },
    {
      id: 3,
      user: 'Дмитрий',
      avatar: 'Д',
      time: '12:40',
      content: 'Кто-нибудь хочет поиграть в игру сегодня вечером?',
      online: false
    },
  ];

  const onlineUsers = [
    { name: 'Александр', avatar: 'A', status: 'online' },
    { name: 'Мария', avatar: 'М', status: 'online' },
    { name: 'Елена', avatar: 'Е', status: 'away' },
    { name: 'Дмитрий', avatar: 'Д', status: 'offline' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Servers Sidebar */}
      <div className="w-20 bg-sidebar flex flex-col items-center py-3 space-y-2">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl mb-2">
          R
        </div>
        <Separator className="w-8 bg-sidebar-border" />
        {servers.map((server) => (
          <div
            key={server.id}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg cursor-pointer transition-all hover:rounded-xl ${
              server.active
                ? 'bg-primary text-primary-foreground'
                : 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {server.name}
          </div>
        ))}
        <div className="w-12 h-12 rounded-2xl bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center font-bold text-2xl cursor-pointer hover:bg-primary hover:text-primary-foreground hover:rounded-xl transition-all">
          +
        </div>
      </div>

      {/* Channels Sidebar */}
      <div className="w-60 bg-sidebar-background border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="text-sidebar-foreground font-semibold text-lg">REDER MESSENGER</h2>
        </div>
        
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Текстовые каналы
            </div>
            {channels.filter(ch => ch.type === 'text').map((channel) => (
              <div
                key={channel.name}
                onClick={() => setActiveChannel(channel.name)}
                className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer group ${
                  activeChannel === channel.name
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Hash" size={16} />
                  <span className="text-sm">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                    {channel.unread}
                  </Badge>
                )}
              </div>
            ))}
            
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-4">
              Голосовые каналы
            </div>
            {channels.filter(ch => ch.type === 'voice').map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} />
                  <span className="text-sm">{channel.name}</span>
                </div>
                {channel.users && channel.users > 0 && (
                  <span className="text-xs text-muted-foreground">{channel.users}</span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Info */}
        <div className="p-2 border-t border-sidebar-border">
          <div className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-accent">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                Ю
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground">Юра</div>
              <div className="text-xs text-muted-foreground">В сети</div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Icon name="Mic" size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Icon name="Headphones" size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Icon name="Settings" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={20} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">{activeChannel}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Users" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Search" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-foreground mt-1">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Сообщение в #${activeChannel}`}
                className="pr-12"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Icon name="Paperclip" size={14} />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Icon name="Smile" size={14} />
                </Button>
              </div>
            </div>
            <Button onClick={handleSendMessage} className="px-4">
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Users Sidebar */}
      <div className="w-60 bg-sidebar-background border-l border-sidebar-border">
        <div className="p-4">
          <h3 className="font-semibold text-sidebar-foreground mb-4">Участники — {onlineUsers.length}</h3>
          <ScrollArea className="space-y-2">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                В сети — {onlineUsers.filter(u => u.status === 'online').length}
              </div>
              {onlineUsers.filter(u => u.status === 'online').map((user) => (
                <div key={user.name} className="flex items-center space-x-2 p-1 rounded hover:bg-sidebar-accent">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-background"></div>
                  </div>
                  <span className="text-sm text-sidebar-foreground">{user.name}</span>
                </div>
              ))}
              
              {onlineUsers.filter(u => u.status === 'away').length > 0 && (
                <>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 mt-4">
                    Отошли — {onlineUsers.filter(u => u.status === 'away').length}
                  </div>
                  {onlineUsers.filter(u => u.status === 'away').map((user) => (
                    <div key={user.name} className="flex items-center space-x-2 p-1 rounded hover:bg-sidebar-accent">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-sidebar-background"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                    </div>
                  ))}
                </>
              )}
              
              {onlineUsers.filter(u => u.status === 'offline').length > 0 && (
                <>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 mt-4">
                    Не в сети — {onlineUsers.filter(u => u.status === 'offline').length}
                  </div>
                  {onlineUsers.filter(u => u.status === 'offline').map((user) => (
                    <div key={user.name} className="flex items-center space-x-2 p-1 rounded hover:bg-sidebar-accent opacity-60">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Index;