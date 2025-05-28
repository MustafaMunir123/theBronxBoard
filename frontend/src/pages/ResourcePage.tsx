import React, { useEffect, useState } from "react";
import { ExternalLink, HeartHandshake, GraduationCap } from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { Resource } from "../types/resource";
import { resources } from "../services/axiosService";

const ResourcesPage: React.FC = () => {
  const [skillsResources, setSkillsResources] = useState<Resource[]>([]);
  const [welfareResources, setWelfareResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      // Replace with real API calls
      const skills = await resources.getSkillRsources();
      const welfare = await resources.getWelfareRsources();

      setSkillsResources(skills.resources as any);
      setWelfareResources(welfare.resources as any);
      setIsLoading(false);
    };

    fetchResources();
  }, []);

  const renderResourceCard = (resource: Resource) => (
    <Card key={resource.id} className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          {resource.type === "Skills" ? (
            <GraduationCap className="h-5 w-5 text-indigo-500" />
          ) : (
            <HeartHandshake className="h-5 w-5 text-pink-500" />
          )}
          {resource.title}
        </h3>
        <p className="text-gray-600 text-sm">{resource.description}</p>
      </div>
      <div className="mt-4">
        <Button
          variant="primary"
          size="sm"
          icon={<ExternalLink className="h-4 w-4" />}
          onClick={() => window.open(resource.website, "_blank")}
        >
          Visit
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Explore Opportunities
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading resources...</p>
      ) : (
        <>
          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Skills to Learn
            </h2>
            {skillsResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsResources.map(renderResourceCard)}
              </div>
            ) : (
              <p className="text-gray-500">No skill resources available.</p>
            )}
          </section>

          {/* Welfare Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Welfare You Can Volunteer For
            </h2>
            {welfareResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {welfareResources.map(renderResourceCard)}
              </div>
            ) : (
              <p className="text-gray-500">No welfare resources available.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ResourcesPage;
