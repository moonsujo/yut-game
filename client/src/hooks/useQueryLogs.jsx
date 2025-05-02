import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useQueryLogs({ eventName, payload }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    const queryLogs = async () => {
      setLoading(true)
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/queryLogs', {
        from: weekAgo,
        to: now,
        eventName,
        payload
      }).then((response) => {
        setLogs(response.data.results);
        setLoading(false);
      }).catch((err) => {
        console.log('[useQueryLogs] error getting log for', eventName, 'payload', payload)
        console.log('[useQueryLogs] error', err)
      })
    }

    queryLogs()
  }, [])

  return [logs, loading]
}

