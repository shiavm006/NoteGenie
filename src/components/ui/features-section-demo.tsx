import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconBook,
  IconUsers,
  IconSearch,
  IconCloud,
  IconShield,
  IconDeviceMobile,
  IconSparkles,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "AI-Powered Notes",
      description:
        "Advanced AI that understands context and helps you create comprehensive, well-organized notes from any material.",
      icon: <IconBrain className="w-6 h-6" />,
    },
    {
      title: "Smart Book Search",
      description:
        "Search through millions of books with instant previews. Find exactly what you need with our intelligent search.",
      icon: <IconBook className="w-6 h-6" />,
    },
    {
      title: "Community Notes",
      description:
        "Share and discover notes from other learners. Collaborate and learn from the community's collective knowledge.",
      icon: <IconUsers className="w-6 h-6" />,
    },
    {
      title: "Instant Search",
      description:
        "Find any information across your entire library instantly. Never lose track of important notes again.",
      icon: <IconSearch className="w-6 h-6" />,
    },
    {
      title: "Cloud Sync",
      description:
        "Access your notes from anywhere. Your library syncs across all devices automatically and securely.",
      icon: <IconCloud className="w-6 h-6" />,
    },
    {
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. We prioritize your privacy and never share your personal information.",
      icon: <IconShield className="w-6 h-6" />,
    },
    {
      title: "Mobile Ready",
      description:
        "Study on the go with our mobile-optimized interface. Take notes anywhere, anytime.",
      icon: <IconDeviceMobile className="w-6 h-6" />,
    },
    {
      title: "Smart Organization",
      description:
        "Automatic categorization and tagging. Let AI organize your notes while you focus on learning.",
      icon: <IconSparkles className="w-6 h-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 