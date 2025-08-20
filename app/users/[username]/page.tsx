"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ExampleClientComponent() {
  const params = useParams();
  const username = params.username;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    avatar_url: "",
    location: "",
    followers: "",
    following: "",
  });

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        console.log(response.data, "loki");
        setUser(response.data);
        return;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username]);

  if (loading) return <div>loading....</div>;

  if (user)
    return (
      // <div className="  border shadow gap-4 max-w-5xl mx-auto text-3xl">
      //   <div>Name: {user && user?.name}</div>
      //   <div>Bio: {user.bio ?? "N/a"}</div>
      //   <div>Location: {user.location} </div>
      //   <div>Followers: {user.followers} </div>
      //   <div>Following: {user.following}</div>
      // </div>

      <div>
        <Dialog open>
          <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl border">
            <div
              className="px-6 py-4 h-36"
              style={{
                background:
                  "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
              }}
            />

            <div className="-mt-14 flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg rounded-full">
                  <AvatarImage src={user.avatar_url} alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto px-6 py-6 space-y-4">
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Label>Name</Label>
                    <Input
                      placeholder="E.g. John Doe"
                      defaultValue={user.name}
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Label>Location</Label>
                    <Input
                      placeholder="Frontend Developer"
                      defaultValue={user.location}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Label>Bio</Label>
                    <Input type="email" defaultValue="margaret@email.com" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Label>Folllowers</Label>
                    <Input defaultValue={user.followers} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Label>Following</Label>
                    <Input defaultValue={user.following} />
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}
