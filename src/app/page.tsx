import ModelsTableWrapper from '@/components/ModelsTableWrapper'
import NewModelsTableWrapper from '@/components/NewModelsTableWrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'
const HomePage: FC = () => {
  return (
    <>
      <div className="container mx-auto py-10">
        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">V1/Models</TabsTrigger>
            <TabsTrigger value="old">Models</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <NewModelsTableWrapper />
          </TabsContent>
          <TabsContent value="old">
            <ModelsTableWrapper />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default HomePage
