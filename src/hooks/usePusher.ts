'use client';
import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY!;
const PUSHER_CLUSTER = 'eu';

export const usePusher = (channelName: string, eventName: string, callback: (data: any) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true
    })
    const channel = pusher.subscribe(channelName)
    channel.bind(eventName, (data: any) => {
      callbackRef.current(data)
    })
    return () => {
      channel.unbind(eventName)
      pusher.unsubscribe(channelName);
      pusher.disconnect()
    }
  }, [channelName, eventName])
}