import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'
import { Search, Plus, MoreVertical, Phone, Mail, Shield, Edit, Trash2 } from 'lucide-react'

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 8900', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234 567 8901', role: 'Agent', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1 234 567 8902', role: 'Agent', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', phone: '+1 234 567 8903', role: 'Manager', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '+1 234 567 8904', role: 'Agent', status: 'Active' },
  ])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage your users and their permissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>{users.length} users in your organization</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Phone</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UsersList
