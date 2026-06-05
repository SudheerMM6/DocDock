import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconStethoscope,
  IconCalendar,
  IconUser,
  IconMail,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

export function FloatingDockNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide dock on login page
  if (location.pathname === "/login") {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const items = [
    {
      title: "Home",
      icon: (
        <IconHome
          className={`h-full w-full ${
            isActive("/")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/");
      },
    },
    {
      title: "Doctors",
      icon: (
        <IconStethoscope
          className={`h-full w-full ${
            isActive("/doctors")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/doctors",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/doctors");
      },
    },
    {
      title: "My Appointments",
      icon: (
        <IconCalendar
          className={`h-full w-full ${
            isActive("/my-appointments")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/my-appointments",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/my-appointments");
      },
    },
    {
      title: "Profile",
      icon: (
        <IconUser
          className={`h-full w-full ${
            isActive("/my-profile")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/my-profile",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/my-profile");
      },
    },
    {
      title: "Contact",
      icon: (
        <IconMail
          className={`h-full w-full ${
            isActive("/contact")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/contact",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/contact");
      },
    },
    {
      title: "About",
      icon: (
        <IconInfoCircle
          className={`h-full w-full ${
            isActive("/about")
              ? "text-primary"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/about",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/about");
      },
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto">
        <FloatingDock
          items={items}
          desktopClassName="mx-auto"
          mobileClassName="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6"
        />
      </div>
    </div>
  );
}
