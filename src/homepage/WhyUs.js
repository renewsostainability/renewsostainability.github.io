import {
  FaStar,
  FaLeaf,
  FaPoundSign,
  FaAward,
  FaBolt
} from "react-icons/fa";

export default function WhyUs() {
  const features = [
    {
      icon: FaLeaf,
      title: "Environmental Stewardship",
      description:
        "Demonstrate your commitment to sustainability and environmental responsibility.",
    },
    {
      icon: FaPoundSign,
      title: "Cost Reduction",
      description:
        "Significantly lower your energy bills while improving operational efficiency.",
    },
    {
      icon: FaAward,
      title: "Expert Guidance",
      description:
        "Benefit from our extensive experience in energy efficiency and sustainability.",
    },
    {
      icon: FaBolt,
      title: "Smart Energy Solutions",
      description:
        "Leverage intelligent systems to optimize energy usage and monitor performance in real time.",
    },
  ];

  const stats = [
    { number: "60%", label: "Average Cost Savings" },
    { number: "5★", label: "Client Satisfaction" },
    { number: "24/7", label: "Expert Support" },
    { number: "100+", label: "Successful Installations" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Side */}
        <div className="text-center lg:text-left lg:pr-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
            <FaStar className="text-orange-500" />
            Why Choose RENEW
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            The{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              SOStainability
            </span>{" "}
            Advantage
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            RENEW is a platform by SOStainability to help entities demonstrate
            environmental stewardship and embrace sustainability, aligning with
            the intrinsic NHS core values of nature, humanity, and society.
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-green-500 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-white text-xl" />
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
