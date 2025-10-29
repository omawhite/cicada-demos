import { Button } from '@workspace/ui/components/button';
import Banner from '../components/Banner';

export default function Page() {
  return (
    <div className="min-h-svh">
      <Banner />
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Simple Tix Demo</h1>
          <Button size="sm">Button</Button>
        </div>
      </div>
    </div>
  );
}
