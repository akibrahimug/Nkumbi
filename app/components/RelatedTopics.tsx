import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

type Topic = {
  title: string;
  url: string;
}

type RelatedTopicsProps = {
  topics: Topic[];
}

export function RelatedTopics({ topics }: RelatedTopicsProps) {
  return (
    <div className="mt-4 p-4 bg-[#F4F1DE] rounded-lg">
      <h3 className="text-md font-semibold mb-2 text-[#5E503F]">Related Topics:</h3>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index}>
            <Link 
              href={topic.url}
              className="text-[#2C5F2D] hover:underline flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

