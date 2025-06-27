import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Enter your age" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Goals</CardTitle>
            <CardDescription>Set your wellness targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="steps">Daily Steps Goal</Label>
              <Input id="steps" type="number" placeholder="10000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Daily Calories Goal</Label>
              <Input id="calories" type="number" placeholder="2500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep Hours Goal</Label>
              <Input id="sleep" type="number" placeholder="8" />
            </div>
            <Button>Update Goals</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="meal-reminders">Meal Reminders</Label>
                <p className="text-sm text-gray-600">Get notified about meal times</p>
              </div>
              <Switch id="meal-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="health-alerts">Health Alerts</Label>
                <p className="text-sm text-gray-600">Receive important health notifications</p>
              </div>
              <Switch id="health-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="workout-reminders">Workout Reminders</Label>
                <p className="text-sm text-gray-600">Get reminded about exercise</p>
              </div>
              <Switch id="workout-reminders" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-sharing">Data Sharing</Label>
                <p className="text-sm text-gray-600">Share data with healthcare providers</p>
              </div>
              <Switch id="data-sharing" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Analytics</Label>
                <p className="text-sm text-gray-600">Help improve the app with usage data</p>
              </div>
              <Switch id="analytics" />
            </div>
            <Button variant="outline" className="w-full">
              Export My Data
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}