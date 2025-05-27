import React from "react";
import {
  ChevronRight,
  Package,
  RotateCcw,
  Shield,
  CreditCard,
  Crown,
  Smartphone,
  Headphones,
  Wallet,
  Mail,
  MessageSquare,
  Bell,
  Gift,
  List,
  Settings,
  Star,
  Users,
  Download,
  User,
} from "lucide-react";

const AccountPage = () => {
  const AccountSection = ({ title, items, className = "" }) => (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 md:p-6 ${className}`}
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="space-y-0 divide-y divide-gray-100">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 md:py-4 hover:bg-gray-50 cursor-pointer group"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="font-green group-hover:font-green">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm md:text-base">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600" />
          </div>
        ))}
      </div>
    </div>
  );

  const quickAccessItems = [
    {
      icon: <Package className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Your Orders",
      description: "Track, return, or buy things again",
    },
    {
      icon: <Settings className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
    },
    {
      icon: <Headphones className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Contact Us",
      description: "Contact our customer service via phone or chat",
    },
  ];

  const digitalContentItems = [
    { icon: <Smartphone className="w-5 h-5" />, title: "Apps and more" },
    { icon: <Download className="w-5 h-5" />, title: "Content Library" },
    { icon: <Settings className="w-5 h-5" />, title: "Devices" },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Digital gifts you've received",
    },
  ];

  const emailAlertsItems = [
    { icon: <Mail className="w-5 h-5" />, title: "Advertising preferences" },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Communication preferences",
    },
    { icon: <Bell className="w-5 h-5" />, title: "SMS alert preferences" },
    { icon: <MessageSquare className="w-5 h-5" />, title: "Message Centre" },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Alexa shopping notifications",
    },
  ];

  const moreWaysToPayItems = [
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Default Purchase Settings",
    },
    { icon: <Wallet className="w-5 h-5" />, title: "Amazon Pay" },
    { icon: <Star className="w-5 h-5" />, title: "Coupons" },
  ];

  const orderingShoppingItems = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Leave packaging feedback",
    },
    { icon: <List className="w-5 h-5" />, title: "Lists" },
    { icon: <Settings className="w-5 h-5" />, title: "Manage saved IDs" },
    { icon: <User className="w-5 h-5" />, title: "Your Shopping preferences" },
    { icon: <User className="w-5 h-5" />, title: "Your Content" },
    { icon: <Settings className="w-5 h-5" />, title: "Language settings" },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Recalls and Product Safety Alerts",
    },
  ];

  const shoppingProgramsItems = [
    { icon: <Users className="w-5 h-5" />, title: "Manage Your Amazon Family" },
    { icon: <RotateCcw className="w-5 h-5" />, title: "Subscribe & Save" },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Shop the Kids' Store by age",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Your Account
        </h1>

        {/* Quick Access Grid - Mobile shows as list, Desktop as grid */}
        <div className="md:hidden space-y-4 mb-8">
          <AccountSection title="Orders" items={quickAccessItems.slice(0, 3)} />
          <AccountSection
            title="Account Settings"
            items={quickAccessItems.slice(3)}
          />
        </div>

        {/* Desktop Quick Access Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {quickAccessItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="font-green">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
